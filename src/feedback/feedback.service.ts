import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Employee } from '../employees/employee.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(Feedback)
        private feedbackRepository: Repository<Feedback>,
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        private readonly httpService: HttpService,
    ) {}

    async create(
        profileId: string,
        authorId: string,
        createFeedbackDto: CreateFeedbackDto,
    ): Promise<Feedback> {
        const employee = await this.employeeRepository.findOne({
            where: { id: profileId },
        });
        if (!employee) {
            throw new NotFoundException(
                `Employee with ID ${profileId} not found`,
            );
        }

        const { text, polish } = createFeedbackDto;
        let polishedText: string | null = null;

        if (polish) {
            try {
                const response = await fetch(
                    'https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn',
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            inputs: text
                        })
                    },
                );
                console.log(response);
                const data = await response.json();
                console.log("Got data", data);
                polishedText = data[0].summary_text;
            } catch (error) {
                console.error('Error polishing text:', error);
            }
        }

        const feedback = new Feedback();
        feedback.profileId = profileId;
        feedback.authorId = authorId;
        feedback.textOriginal = text;
        feedback.textPolished = polishedText;
        feedback.isPolished = polish && polishedText ? 1 : 0;

        return this.feedbackRepository.save(feedback);
    }

    async findAll(
        profileId: string,
        limit?: number,
        offset?: number,
    ): Promise<Feedback[]> {
        const employee = await this.employeeRepository.findOne({
            where: { id: profileId }
        });
        if (!employee) {
            throw new NotFoundException(
                `Employee with ID ${profileId} not found`,
            );
        }

        return this.feedbackRepository.find({
            where: { profileId: profileId },
            take: limit,
            skip: offset,
            relations: {
                author: true
            }
        });
    }
}

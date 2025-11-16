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
                const { data } = await firstValueFrom(
                    this.httpService.post(
                        'https://api-inference.huggingface.co/models/tuner007/pegasus_paraphrase',
                        { inputs: text },
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
                            },
                        },
                    ),
                );
                polishedText = data[0].generated_text;
            } catch (error) {
                console.error('Error polishing text:', error);
            }
        }

        const feedback = new Feedback();
        feedback.profile_id = profileId;
        feedback.author_id = authorId;
        feedback.text_original = text;
        feedback.text_polished = polishedText;
        feedback.is_polished = polish && polishedText ? 1 : 0;

        return this.feedbackRepository.save(feedback);
    }

    async findAll(
        profileId: string,
        limit?: number,
        offset?: number,
    ): Promise<Feedback[]> {
        const employee = await this.employeeRepository.findOne({
            where: { id: profileId },
        });
        if (!employee) {
            throw new NotFoundException(
                `Employee with ID ${profileId} not found`,
            );
        }

        return this.feedbackRepository.find({
            where: { profile_id: profileId },
            take: limit,
            skip: offset,
        });
    }
}

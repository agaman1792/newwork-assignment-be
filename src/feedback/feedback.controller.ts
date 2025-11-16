import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    Query,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('profiles/:profileId/feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Param('profileId') profileId: string,
        @Request() req,
        @Body() createFeedbackDto: CreateFeedbackDto,
    ) {
        return this.feedbackService.create(
            profileId,
            req.user.userId,
            createFeedbackDto,
        );
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll(
        @Param('profileId') profileId: string,
        @Query('limit') limit?: number,
        @Query('offset') offset?: number,
    ) {
        return this.feedbackService.findAll(profileId, limit, offset);
    }
}

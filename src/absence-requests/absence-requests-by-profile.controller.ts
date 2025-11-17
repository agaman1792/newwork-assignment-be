import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbsenceRequestsService } from './absence-requests.service';
import { CreateAbsenceRequestDto } from './dto/create-absence-request.dto';

@Controller('profiles/:id/absence-requests')
@UseGuards(AuthGuard('jwt'))
export class AbsenceRequestsByProfileController {
    constructor(private absenceRequestsService: AbsenceRequestsService) {}

    @Post()
    create(
        @Param('id') profileId: string,
        @Body() createDto: CreateAbsenceRequestDto,
        @Request() req,
    ) {
        return this.absenceRequestsService.create(
            profileId,
            createDto,
            req.user,
        );
    }

    @Get()
    findAllForProfile(@Param('id') profileId: string, @Request() req) {
        return this.absenceRequestsService.findAllForProfile(
            profileId,
            req.user,
        );
    }
}

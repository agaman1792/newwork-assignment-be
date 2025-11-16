import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    UseGuards,
    Request,
    Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbsenceRequestsService } from './absence-requests.service';
import { CreateAbsenceRequestDto } from './dto/create-absence-request.dto';
import { Roles, RolesGuard } from '../authz/roles.guard';

@Controller()
export class AbsenceRequestsController {
    constructor(private absenceRequestsService: AbsenceRequestsService) {}

    @Post('profiles/:id/absence-requests')
    @UseGuards(AuthGuard('jwt'))
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

    @Get('profiles/:id/absence-requests')
    @UseGuards(AuthGuard('jwt'))
    findAllForProfile(@Param('id') profileId: string, @Request() req) {
        return this.absenceRequestsService.findAllForProfile(
            profileId,
            req.user,
        );
    }

    @Put('absence-requests/:id/approve')
    @Roles('MANAGER', 'ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    approve(@Param('id') id: string, @Request() req) {
        return this.absenceRequestsService.approve(id, req.user);
    }

    @Put('absence-requests/:id/reject')
    @Roles('MANAGER', 'ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    reject(@Param('id') id: string, @Request() req) {
        return this.absenceRequestsService.reject(id, req.user);
    }

    @Put('absence-requests/:id/cancel')
    @UseGuards(AuthGuard('jwt'))
    cancel(@Param('id') id: string, @Request() req) {
        return this.absenceRequestsService.cancel(id, req.user);
    }
}

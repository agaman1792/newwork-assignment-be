import {
    Controller,
    Param,
    UseGuards,
    Request,
    Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbsenceRequestsService } from './absence-requests.service';
import { Roles, RolesGuard } from '../authz/roles.guard';

@Controller('absence-requests')
export class AbsenceRequestsController {
    constructor(private absenceRequestsService: AbsenceRequestsService) {}

    @Put(':id/approve')
    @Roles('MANAGER', 'ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    approve(@Param('id') id: string, @Request() req) {
        return this.absenceRequestsService.approve(id, req.user);
    }

    @Put(':id/reject')
    @Roles('MANAGER', 'ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    reject(@Param('id') id: string, @Request() req) {
        return this.absenceRequestsService.reject(id, req.user);
    }

    @Put(':id/cancel')
    @UseGuards(AuthGuard('jwt'))
    cancel(@Param('id') id: string, @Request() req) {
        return this.absenceRequestsService.cancel(id, req.user);
    }
}

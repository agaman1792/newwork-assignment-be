import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
    HttpCode,
    HttpStatus,
    Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../authz/roles.guard';
import { RolesGuard } from '../authz/roles.guard';
import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { UpdateEmployeeRolesDto } from './dto/update-employee-roles.dto';
import { EmployeesService } from './employees.service';
import { RegisterEmployeeDto } from '../authz/dto/register-employee.dto';

@Controller('profiles')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) {}

    @Post()
    @Roles('ADMIN', 'MANAGER')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    create(@Body() createEmployeeProfileDto: CreateEmployeeProfileDto) {
        return this.employeesService.create(createEmployeeProfileDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll() {
        return this.employeesService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findOne(@Param('id') id: string, @Request() req) {
        return this.employeesService.findOne(id, req.user);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    update(
        @Param('id') id: string,
        @Body() updateEmployeeProfileDto: UpdateEmployeeProfileDto,
        @Request() req,
    ) {
        return this.employeesService.update(
            id,
            updateEmployeeProfileDto,
            req.user,
        );
    }
    @Put(':id/roles')
    @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    updateRoles(
        @Param('id') id: string,
        @Body() updateEmployeeRolesDto: UpdateEmployeeRolesDto,
    ) {
        return this.employeesService.updateRoles(id, updateEmployeeRolesDto);
    }
}

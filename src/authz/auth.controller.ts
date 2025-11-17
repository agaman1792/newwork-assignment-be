import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
    Request,
    SetMetadata,
    Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterEmployeeDto } from './dto/register-employee.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Roles, RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    @Post('password/change')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    changePassword(
        @Request() req,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        return this.authService.changePassword(
            req.user.userId,
            changePasswordDto,
        );
    }

    @Post('password/reset')
    @Roles('ADMINISTRATOR')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    resetPassword(
        @Body() resetPasswordDto: ResetPasswordDto,
    ): Promise<{ password }> {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@Request() req) {
        return this.authService.getProfile(req.user.userId);
    }
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterEmployeeDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    roles: string;
}

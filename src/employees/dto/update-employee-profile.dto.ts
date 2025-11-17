import { IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeProfileDto {
    @IsString()
    @IsOptional()
    roles?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    position?: string;

    @IsString()
    @IsOptional()
    department?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsString()
    @IsOptional()
    hireDate?: string;

    @IsString()
    @IsOptional()
    birthDate?: string;

    @IsString()
    @IsOptional()
    salary?: string;

    @IsString()
    @IsOptional()
    ssn?: string;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    skills?: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}

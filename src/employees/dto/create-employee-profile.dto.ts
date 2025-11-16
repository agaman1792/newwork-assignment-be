import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeProfileDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    position: string;

    @IsString()
    @IsNotEmpty()
    department: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    hireDate: string;

    @IsString()
    @IsNotEmpty()
    birthDate: string;

    @IsString()
    @IsNotEmpty()
    salary: string;

    @IsString()
    @IsNotEmpty()
    ssn: string;

    @IsString()
    @IsNotEmpty()
    bio: string;

    @IsString()
    @IsNotEmpty()
    skills: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;
}

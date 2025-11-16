import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAbsenceRequestDto {
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    reason: string;
}

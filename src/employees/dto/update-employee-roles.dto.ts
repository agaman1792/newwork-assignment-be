import { IsString } from 'class-validator';

export class UpdateEmployeeRolesDto {
    @IsString()
    roles: string;
}

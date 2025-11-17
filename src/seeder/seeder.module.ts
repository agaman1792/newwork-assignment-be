import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employees/employee.entity';
import { UserSeederService } from './user-seeder.service';

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    providers: [UserSeederService],
})
export class SeederModule {}

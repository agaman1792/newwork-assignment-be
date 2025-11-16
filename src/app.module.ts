import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authz/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AbsenceRequestsModule } from './absence-requests/absence-requests.module';
import { AuditModule } from './audit/audit.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'sqlite',
                database: configService.get<string>('SQLITE_DB_PATH'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true, // Be cautious with this in production
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        EmployeesModule,
        FeedbackModule,
        AbsenceRequestsModule,
        AuditModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

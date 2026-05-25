import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { BirthdayController} from './birthday-remainder.controller';
import { BirthdayService} from './services/birthday-remainder.service';
import { MailService } from './services/mail.service';

import {
  User,
  UserSchema,
} from './schema/user.schema';
import { BirthdayCron } from './birthday-remainder.cron';
import { UserService } from './services/user.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    ScheduleModule.forRoot(),
  ],

  controllers: [BirthdayController],
  providers: [BirthdayService,UserService, MailService, BirthdayCron],
})
export class BirthdayModule {} 
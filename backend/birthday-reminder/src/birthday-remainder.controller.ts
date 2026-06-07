import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { UserService } from './services/user.service';
import { BirthdayService } from './services/birthday-remainder.service';

import { CreateUserDto } from './dtos/create-user.dto';

@Controller()
export class BirthdayController {
  constructor(
    private readonly userService: UserService,
    private readonly birthdayService: BirthdayService,
  ) {}

  // ✅ HEALTH CHECK
  @Get('/')
  healthCheck() {
    return {
      success: true,
      message: 'API is healthy',
    };
  }

  // ✅ CREATE USER
  @Post('users')
  async createUser(
    @Body() body: CreateUserDto,
  ) {
    return this.userService.createUser(body);
  }

  // ✅ GET TODAY'S BIRTHDAYS (for testing)
  @Get('birthdays/today')
  async getTodayBirthdays() {
    const users =
      await this.birthdayService.getTodayBirthdays();

    return {
      success: true,
      count: users.length,
      data: users,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { BirthdayService } from './services/birthday-remainder.service';
import { MailService } from './services/mail.service';

@Injectable()
export class BirthdayCron {
  constructor(
    private readonly birthdayService: BirthdayService,
    private readonly mailService: MailService,
  ) {}

  @Cron('0 7 * * *')
  async handleBirthdayEmails() {
    const users = await this.birthdayService.getTodayBirthdays();

    for (const user of users) {
      await this.mailService.sendBirthdayEmail(
        user.email,
        user.username,
      );

      console.log(`Sent birthday email → ${user.email}`);
    }
  }
}
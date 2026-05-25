import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendBirthdayEmail(email: string, username: string) {
    try {
      await this.transporter.sendMail({
        from: `"Birthday App 🎉" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Happy Birthday ${username} 🎂`,
        html: `
          <div style="font-family:Arial;padding:20px">
            <h2>Happy Birthday 🎉</h2>
            <p>Hi <b>${username}</b>,</p>
            <p>Wishing you a wonderful year ahead filled with success and joy.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Mail error:', error);
      throw new InternalServerErrorException('Email sending failed');
    }
  }
}
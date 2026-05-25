import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class BirthdayService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getTodayBirthdays() {
    const today = new Date();

    const month = today.getMonth() + 1;
    const day = today.getDate();

    return this.userModel.find({
      birthMonth: month,
      birthDay: day,
    });
  }
}
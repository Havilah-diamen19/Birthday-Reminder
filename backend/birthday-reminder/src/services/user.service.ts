import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from '../dtos/create-user.dto';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(body: CreateUserDto) {
    try {
      const email = body.email.toLowerCase().trim();
      const username = body.username?.trim();
      const dob = new Date(body.dateOfBirth);

      const exists = await this.userModel.findOne({ email });

      if (exists) {
        throw new ConflictException('Email already exists');
      }

      const user = await this.userModel.create({
        username,
        email,
        dateOfBirth: dob,
        birthMonth: dob.getMonth() + 1,
        birthDay: dob.getDate(),
      });

      return {
        success: true,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      console.error(error);

      if (error instanceof ConflictException) throw error;

      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
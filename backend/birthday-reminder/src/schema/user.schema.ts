import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  username!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop({ required: true })
  dateOfBirth!: Date;

  @Prop({ required: true })
  birthMonth!: number;

  @Prop({ required: true })
  birthDay!: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ birthMonth: 1, birthDay: 1 });
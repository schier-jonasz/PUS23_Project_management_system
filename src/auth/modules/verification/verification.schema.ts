import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserId } from '../user/user.model';

export type VerificationCode = string;
export type UserVerificationId = string;

@Schema({ collection: 'verification_codes', timestamps: true })
export class UserVerification extends Document {
  @Prop({ required: true, unique: true })
  _id: UserVerificationId;

  @Prop({ required: true, unique: true })
  verificationCode: VerificationCode;

  @Prop({ required: true })
  userId: UserId;

  @Prop({ required: true, default: false })
  isUsed: boolean;

  @Prop({ required: true })
  expirationInMinutes: number;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;
}

export const UserVerificationSchema =
  SchemaFactory.createForClass(UserVerification);

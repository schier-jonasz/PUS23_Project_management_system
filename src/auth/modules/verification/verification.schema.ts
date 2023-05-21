import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserId } from '../user/user.model';

export type VerificationCode = string;
export type UserVerificationId = string;

export type UserVerificationResponse = UserVerification & {
  _id: UserVerificationId;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ collection: 'verification_codes', timestamps: true })
export class UserVerification extends Document {
  @Prop({ required: true, unique: true })
  verificationCode: VerificationCode;

  @Prop({ required: true })
  userId: UserId;

  @Prop({ required: true, default: false })
  isUsed: boolean;

  @Prop({ required: true })
  expirationInMinutes: number;
}

export const UserVerificationSchema =
  SchemaFactory.createForClass(UserVerification);

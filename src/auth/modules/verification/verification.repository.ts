import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserVerification,
  UserVerificationId,
  UserVerificationResponse,
  VerificationCode,
} from './verification.schema';
import { CreateUserVerificationDto } from './dtos/create-user-verification.dto';

@Injectable()
export class VerificationRepository {
  constructor(
    @InjectModel(UserVerification.name)
    private readonly model: Model<UserVerification>,
  ) {}

  public async save(
    dto: CreateUserVerificationDto,
  ): Promise<UserVerificationResponse | null> {
    const userVerification = await this.model.create(dto);
    return userVerification as unknown as UserVerificationResponse | null;
  }

  public async getByVerificationCode(
    verificationCode: VerificationCode,
  ): Promise<UserVerificationResponse | null> {
    return this.model.findOne({ verificationCode }, { new: true });
  }

  public async getAll(): Promise<UserVerification[]> {
    return this.model.find();
  }

  public async update(
    id: UserVerificationId,
    props: Partial<UserVerification>,
  ): Promise<UserVerification | null> {
    return this.model.findByIdAndUpdate(id, props);
  }
}

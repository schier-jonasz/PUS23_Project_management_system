import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserVerification, VerificationCode } from './verification.schema';
import { CreateUserVerificationDto } from './dtos/create-user-verification.dto';

@Injectable()
export class VerificationRepository {
  constructor(
    @InjectModel(UserVerification.name)
    private readonly model: Model<UserVerification>,
  ) {}

  public async save(
    dto: CreateUserVerificationDto,
  ): Promise<UserVerification | null> {
    return this.model.create(dto);
  }

  public async getByVerificationCode(
    code: VerificationCode,
  ): Promise<UserVerification | null> {
    return this.model.findOne({ code });
  }
}

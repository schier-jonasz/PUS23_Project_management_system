import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos';
import { UserService } from './modules/user/user.service';
import { CryptoService } from './modules/crypto/crypto.service';
import { VerificationService } from './modules/verification/verification.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly verificationService: VerificationService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  async register(dto: RegisterUserDto) {
    const userExists = await this.userService.getByEmail(dto.email);
    if (userExists) {
      this.logger.log(
        `User with given email already exists. Email: [${dto.email}]`,
      );
      throw new BadRequestException('Invalid registration credentials');
    }

    const { password, ...userCredentials } = dto;
    const hashedPassword = await this.cryptoService.hashPassword(password);

    const user = await this.userService.createUser({
      ...userCredentials,
      password: hashedPassword,
    });
    this.logger.log(`Successfully created user. email: [${dto.email}]`);

    const userVerification =
      await this.verificationService.createUserVerification(user.id);

    console.log(userVerification); // todo: remove me

    return {
      verificationCode: userVerification.verificationCode,
    };
  }

  async activate() {
    return 'todo';
  }

  async login() {
    return 'todo';
  }

  async refreshTokens() {
    return 'todo';
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { UserService } from './modules/user/user.service';
import { CryptoService } from './modules/crypto/crypto.service';
import { VerificationService } from './modules/verification/verification.service';
import { VerificationCode } from './modules/verification/verification.schema';
import { User } from './modules/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly verificationService: VerificationService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
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

    return {
      verificationCode: userVerification.verificationCode,
    };
  }

  async activate(verificationCode: VerificationCode) {
    const userVerification =
      await this.verificationService.getByVerificationCode(verificationCode);

    if (!userVerification) {
      this.logger.log(
        `User verification with given code does not exist. verificationCode: [${verificationCode}]`,
      );
      throw new BadRequestException('Invalid verification code');
    }

    const user = await this.userService.getById(userVerification.userId);
    if (!user) {
      this.logger.log(
        `User with given id does not exist. userId: [${userVerification.userId}]`,
      );
      throw new BadRequestException('Invalid verification code');
    }

    const isExpired = await this.verificationService.checkIfCodeIsExpired(
      userVerification,
    );
    if (isExpired) {
      this.logger.log(
        `Tried to activate user with an expired code. verificationCode: [${verificationCode}], userId: [${user.id}]`,
      );
      throw new BadRequestException('Verification code is already expired');
    }

    const { email, isActive } = await this.userService.activateUser(user);
    await this.verificationService.markVerificationAsUsed(userVerification._id);

    return {
      email,
      isActive,
    };
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      this.logger.log(
        `User with given email does not exist. email: [${email}]`,
      );
      throw new BadRequestException('Invalid credentials');
    }

    const hashedPassword = user.password;
    const passwordsMatch = await this.cryptoService.comparePasswords(
      password,
      hashedPassword,
    );
    if (!passwordsMatch) {
      this.logger.log(`User provided bad password. email: [${email}]`);
      throw new BadRequestException('Invalid credentials');
    }

    const isActivated = user.isActive;
    if (!isActivated) {
      this.logger.log(`User has not activated account. email: [${email}]`);
      throw new BadRequestException('You need to activate account to log in');
    }

    const payload = this.getJwtPayload(user);
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      secret: this.config.get('JWT_SECRET'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens() {
    return this.verificationService.getAll();
  }

  private getJwtPayload(user: User) {
    return {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
    };
  }
}

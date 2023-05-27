import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { UserService } from './modules/user/user.service';
import { CryptoService } from './modules/crypto/crypto.service';
import { VerificationService } from './modules/verification/verification.service';
import { User, UserId } from './modules/user/user.model';
import { VerificationCode } from './modules/verification/verification.model';

interface JwtPayload {
  sub: UserId;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

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

    const { verificationCode } =
      await this.verificationService.createUserVerification(user.id);

    return {
      verificationCode,
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
    const { isUsed } = userVerification;
    if (isExpired || isUsed) {
      this.logger.log(
        `Tried to activate user with an expired or used code. verificationCode: [${verificationCode}], userId: [${user.id}], isUsed: [${isUsed}], isExpired: [${isExpired}]`,
      );
      throw new NotFoundException(
        'Verification code is already expired or used',
      );
    }

    const { email, isActive } = await this.userService.activateUser(user);
    await this.verificationService.markVerificationAsUsed(userVerification.id);

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

    return this.getTokens(payload);
  }

  async refreshTokens(token: string) {
    const isValid = await this.jwtService.verifyAsync(token, {
      secret: this.config.get('JWT_SECRET'),
    });
    if (!isValid) {
      this.logger.log(`Invalid refresh token. token: [${token}]`);
      throw new BadRequestException('Invalid token');
    }

    const { sub: userId } = this.jwtService.decode(token) as { sub: UserId };
    const user = await this.userService.getById(userId);
    if (!user) {
      this.logger.log(
        `User with the ID passed in token does not exist. userId: [${userId}]`,
      );
      throw new BadRequestException('Invalid token');
    }

    const payload = this.getJwtPayload(user);

    return this.getTokens(payload);
  }

  private getJwtPayload(user: User): JwtPayload {
    return {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
    };
  }

  private async getTokens(payload: JwtPayload) {
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
}

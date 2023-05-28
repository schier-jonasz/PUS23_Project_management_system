import { IsJWT } from 'class-validator';

export class RefreshTokensDto {
  @IsJWT()
  refreshToken: string;
}

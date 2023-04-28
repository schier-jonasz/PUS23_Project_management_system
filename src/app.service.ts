import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  test(): string {
    return 'HelloWorld';
    // return {
    //   redis: 'ok',
    //   postgres: 'ok',
    //   mongo: 'ok',
    //   rabbit: 'ok',
    // };
  }
}

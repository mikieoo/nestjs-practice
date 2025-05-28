import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}

// nest g resource: 원하는 모듈을 생성할 수 있는 명령어
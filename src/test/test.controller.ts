import { Controller, Delete, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';

@Controller('test')
@ApiTags('Тестовые возможности')
export class TestController {
  constructor(private testService: TestService) {}
  @Post('/database')
  create() {
    return this.testService.create();
  }
}

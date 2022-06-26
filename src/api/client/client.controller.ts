import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/decorators/account-auth.decorator';
@Controller('')
export class ClientController {
  @Get('task')
  task(@Auth() user) {}
}

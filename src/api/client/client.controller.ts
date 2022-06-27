import { Controller, Get, UseGuards } from '@nestjs/common';
import { Auth } from 'src/decorators/account-auth.decorator';
import { AuthDto } from 'src/dto/auth.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ClientService } from './client.service';
@Controller('')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private clientService: ClientService) {}
  @Get('task')
  task(@Auth() user: AuthDto) {
    return this.clientService.getTasks(user);
  }
}

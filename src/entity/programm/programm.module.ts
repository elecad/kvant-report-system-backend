import { Module } from '@nestjs/common';
import { ProgrammController } from './programm.controller';
import { ProgrammService } from './programm.service';

@Module({
  controllers: [ProgrammController],
  providers: [ProgrammService]
})
export class ProgrammModule {}

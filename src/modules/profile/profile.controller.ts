import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth-guard/auth.guard';
import { User } from 'src/guards/auth-guard/decorators/user.decorator';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { parseIntOptions } from 'src/validators/options/parseIntPipe.option';
import { AddAnswerDto } from './dto/add-answer.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  getProfile(@User() user: AuthUser) {
    return this.profileService.getProfileInfo(user);
  }

  @Get('tasks')
  getTask(@User() user: AuthUser) {
    return this.profileService.getTasksByUser(user);
  }

  @Get('task/:id')
  getDependencyTask(
    @User() user: AuthUser,
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
  ) {
    return this.profileService.getDependencyByTaskId(id, user);
  }

  @Post('answer')
  addAnswer(@User() user: AuthUser, @Body() addAnswerDto: AddAnswerDto) {
    return this.profileService.addAnswer(user, addAnswerDto);
  }

  @Get('answer/:id')
  getAnswer(
    @User() user: AuthUser,
    @Param('id', new ParseIntPipe(parseIntOptions)) id: number,
  ) {
    return this.profileService.getAnswerByID(id, user);
  }
}

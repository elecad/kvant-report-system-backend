import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { AccountService } from '../account/account.service';
import { DependencyService } from '../dependency/dependency.service';
import { TaskService } from '../task/task.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly accountService: AccountService,
    private readonly taskService: TaskService,
    private readonly dependencyService: DependencyService,
  ) {}

  async getDependencyByTaskID(task_id: number, user: AuthUser) {
    const task = await this.taskService.getTaskByIdAndUser(task_id, user);
    return this.dependencyService.getByTask(task, user);
  }
}

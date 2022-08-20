import { Injectable } from '@nestjs/common';
import { filter } from 'modern-async';
import { AuthUser } from 'src/guards/auth-guard/interfaces/auth.interface';
import { AboutDependencyTableService } from '../entities/about-dependency-table/about-dependency-table.service';
import { AccountTableService } from '../entities/account-table/account-table.service';
import { AnswerTable } from '../entities/answer-table/entities/answer-table.entity';
import { DependencyTableService } from '../entities/dependency-table/dependency-table.service';
import { TaskProfileDto } from '../task/dto/task-profile.dto';

@Injectable()
export class DependencyService {
  constructor(
    private readonly dependencyTableService: DependencyTableService,
    private readonly accountTableService: AccountTableService,
    private readonly aboutDependencyTableService: AboutDependencyTableService,
  ) {}

  async getByTask(task: TaskProfileDto, user: AuthUser) {
    return filter(
      user.dependencies,
      (d) =>
        !!this.aboutDependencyTableService.findOne({
          where: { dependency_id: d.id },
          include: { model: AnswerTable, where: { task_id: task.id } },
        }),
    );
  }
}

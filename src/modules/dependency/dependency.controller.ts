import { Controller } from '@nestjs/common';
import { DependencyTableController } from '../entities/dependency-table/dependency-table.controller';

@Controller('dependency')
export class DependencyController extends DependencyTableController {}

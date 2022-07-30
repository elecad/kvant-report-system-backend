import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { Dependency } from 'src/modules/dependency/entities/dependency.entity';

export interface AboutDependencyCreateAttr {
  answer_id: number;
  dependency_id: number;
  data_id: number;
}

@Table({ tableName: 'about_dependency', createdAt: false, updatedAt: false })
export class AboutDependency extends Model<
  AboutDependency,
  AboutDependencyCreateAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Answer)
  answer_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Dependency)
  dependency_id: number;

  @BelongsTo(() => Answer)
  answer: Answer;

  @BelongsTo(() => Dependency)
  dependency: Dependency;
}

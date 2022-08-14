import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AnswerTable } from '../../answer-table/entities/answer-table.entity';
import { DataOfTypeTable } from '../../data-of-type-table/entities/data-of-type-table.entity';
import { DependencyTable } from '../../dependency-table/entities/dependency-table.entity';

export interface AboutDependencyTableCreateAttr {
  answer_id: number;
  dependency_id: number;
  data_of_type_id: number;
  value: number;
}

@Table({ tableName: 'about_dependency', createdAt: false, updatedAt: false })
export class AboutDependencyTable extends Model<
  AboutDependencyTable,
  AboutDependencyTableCreateAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => AnswerTable)
  answer_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => DependencyTable)
  dependency_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => DataOfTypeTable)
  data_of_type_id: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  value: number;

  @BelongsTo(() => AnswerTable)
  answer: AnswerTable;

  @BelongsTo(() => DependencyTable)
  dependency: DependencyTable;

  @BelongsTo(() => DataOfTypeTable)
  data_of_type: DataOfTypeTable;
}

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
import { ProgrammTable } from '../../programm-table/entities/programm-table.entity';

export interface AboutProgrammTableCreateAttr {
  answer_id: number;
  programm_id: number;
  data_of_type_id: number;
  value: number;
}

@Table({ tableName: 'about_programm', createdAt: false, updatedAt: false })
export class AboutProgrammTable extends Model<
  AboutProgrammTable,
  AboutProgrammTableCreateAttr
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
  @ForeignKey(() => ProgrammTable)
  programm_id: number;

  @BelongsTo(() => AnswerTable)
  answer: AnswerTable;

  @BelongsTo(() => ProgrammTable)
  programm: ProgrammTable;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => DataOfTypeTable)
  data_of_type_id: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  value: number;

  @BelongsTo(() => DataOfTypeTable)
  data_of_type: DataOfTypeTable;
}

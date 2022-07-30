import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { Programm } from 'src/modules/programm/entities/programm.entity';

export interface AboutProgrammCreateAttr {
  answer_id: number;
  programm_id: number;
  data_id: number;
}

@Table({ tableName: 'about_programm', createdAt: false, updatedAt: false })
export class AboutProgramm extends Model<
  AboutProgramm,
  AboutProgrammCreateAttr
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
  @ForeignKey(() => Programm)
  programm_id: number;

  @BelongsTo(() => Answer)
  answer: Answer;

  @BelongsTo(() => Programm)
  programm: Programm;
}

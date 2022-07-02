import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/entity/account/account.model';
import { PlaceData } from '../place_data/place_data.model';
import { ProgrammData } from '../programm_data/programm_data.model';
import { Task } from '../task/task.model';

interface AnswerCreateAttr {
  account_id: number;
  task_id: number;
}

@Table({ tableName: 'answer', updatedAt: false })
export class Answer extends Model<Answer, AnswerCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty({ example: 1, description: 'ID Ответа' })
  id: number;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на Аккаунт',
  })
  account_id: number;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на Задание',
  })
  task_id: number;

  @BelongsTo(() => Account)
  account: Account;

  @BelongsTo(() => Task)
  task: Task;

  @HasMany(() => PlaceData)
  place_data: PlaceData[];

  @HasMany(() => ProgrammData)
  programm_data: ProgrammData[];
}

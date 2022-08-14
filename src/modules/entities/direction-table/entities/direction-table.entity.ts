import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ProgrammTable } from '../../programm-table/entities/programm-table.entity';

export interface DirectionTableCreateAttr {
  name: string;
}

@Table({ tableName: 'direction', createdAt: false, updatedAt: false })
export class DirectionTable extends Model<
  DirectionTable,
  DirectionTableCreateAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => ProgrammTable)
  programms: ProgrammTable[];
}

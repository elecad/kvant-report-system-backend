import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Programm } from 'src/modules/programm/entities/programm.entity';

export interface DirectionCreateAttr {
  name: string;
}

@Table({ tableName: 'direction', createdAt: false, updatedAt: false })
export class Direction extends Model<Direction, DirectionCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Programm)
  programms: Programm[];
}

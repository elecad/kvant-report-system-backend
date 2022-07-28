import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}

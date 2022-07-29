import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataOfType } from 'src/modules/data_of_type/entities/data_of_type.entity';

export interface DatumCreateAttr {
  value: number;
  data_of_type_id: number;
}

@Table({ tableName: 'data', createdAt: false, updatedAt: false })
export class Datum extends Model<Datum, DatumCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  value: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => DataOfType)
  data_of_type_id: number;

  @BelongsTo(() => DataOfType)
  data_of_type: DataOfType;
}

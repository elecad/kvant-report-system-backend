import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Report } from 'src/modules/report/entities/report.entity';

export interface DataOfTypeCreateAttr {
  description: string;
  code_name: string;
  report_id: number;
}

@Table({ tableName: 'data_of_type', createdAt: false, updatedAt: false })
export class DataOfType extends Model<DataOfType, DataOfTypeCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  code_name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Report)
  report_id: number;

  @BelongsTo(() => Report)
  report: Report;
}

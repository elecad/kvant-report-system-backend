import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { DataOfType } from 'src/modules/data_of_type/entities/data_of_type.entity';

export interface ReportCreateAttr {
  name: string;
}

@Table({ tableName: 'report', createdAt: false, updatedAt: false })
export class Report extends Model<Report, ReportCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => DataOfType)
  data_of_type: DataOfType[];
}

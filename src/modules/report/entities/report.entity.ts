import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}

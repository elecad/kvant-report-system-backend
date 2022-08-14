import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface ReportTemlateTableCreateAttr {
  name: string;
  code_name: string;
}

@Table({ tableName: 'report_template', createdAt: false, updatedAt: false })
export class ReportTemplateTable extends Model<
  ReportTemplateTable,
  ReportTemlateTableCreateAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  code_name: string;

  // @HasMany(() => DataOfType)
  // data_of_type: DataOfType[];
}

import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { DataOfTypeTable } from '../../data-of-type-table/entities/data-of-type-table.entity';

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

  @HasMany(() => DataOfTypeTable)
  data_of_type: DataOfTypeTable[];
}

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ReportTemplateTable } from '../../report-template-table/entities/report-template-table.entity';

export interface DataOfTypeTableCreateAttr {
  description: string;
  code_name: string;
  report_template_id: number;
}

@Table({ tableName: 'data_of_type', createdAt: false, updatedAt: false })
export class DataOfTypeTable extends Model<
  DataOfTypeTable,
  DataOfTypeTableCreateAttr
> {
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
  @ForeignKey(() => ReportTemplateTable)
  template_id: number;

  @BelongsTo(() => ReportTemplateTable)
  template: ReportTemplateTable;
}

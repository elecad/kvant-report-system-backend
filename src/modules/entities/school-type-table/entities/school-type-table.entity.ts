import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SchoolTable } from '../../school-table/entities/school-table.entity';

export interface SchoolTypeTableCreateAttr {
  name: string;
}

@Table({ tableName: 'school_type', createdAt: false, updatedAt: false })
export class SchoolTypeTable extends Model<
  SchoolTypeTable,
  SchoolTypeTableCreateAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => SchoolTable)
  schools: SchoolTable[];
}

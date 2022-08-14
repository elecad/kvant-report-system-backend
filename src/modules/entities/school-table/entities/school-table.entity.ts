import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DependencyTable } from '../../dependency-table/entities/dependency-table.entity';
import { SchoolTypeTable } from '../../school-type-table/entities/school-type-table.entity';

export interface SchoolTableCreateAttr {
  name: string;
  adress: string;
  dependency_id: number;
  school_type_id: number;
}

@Table({ tableName: 'school', createdAt: false, updatedAt: false })
export class SchoolTable extends Model<SchoolTable, SchoolTableCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  adress: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => DependencyTable)
  dependency_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => SchoolTypeTable)
  school_type_id: number;

  @BelongsTo(() => SchoolTypeTable)
  school_type: SchoolTypeTable;

  @BelongsTo(() => DependencyTable)
  dependency: DependencyTable;

  // @HasMany(() => Programm)
  // programms: Programm[];
}

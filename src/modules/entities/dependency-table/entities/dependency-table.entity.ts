import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { DependencyTypeTable } from '../../dependency-type-table/entities/dependency-type-table.entity';

export interface DependencyTableCreateAttr {
  name: string;
  short_name: string;
  dependency_type_id: number;
}

@Table({ tableName: 'dependency', createdAt: false, updatedAt: false })
export class DependencyTable extends Model<
  DependencyTable,
  DependencyTableCreateAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  short_name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => DependencyTypeTable)
  dependency_type_id: number;

  @BelongsTo(() => DependencyTypeTable)
  dependency_type: DependencyTypeTable;

  // @BelongsToMany(() => Account, () => Account_Dependency)
  // accounts: Account[];

  // @HasMany(() => School)
  // schools: School[];

  // @HasMany(() => Event)
  // events: Event[];

  // @HasMany(() => Programm)
  // programms: Programm[];

  // @HasMany(() => AboutDependency)
  // about_dependencies: AboutDependency[];
}

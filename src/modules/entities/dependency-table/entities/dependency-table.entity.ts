import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { AboutDependencyTable } from '../../about-dependency-table/entities/about-dependency-table.entity';
import { AccountTable } from '../../account-table/entities/account-table.entity';
import { Account_DependencyTable } from '../../account-table/entities/account_dependency-table.entity';

import { DependencyTypeTable } from '../../dependency-type-table/entities/dependency-type-table.entity';
import { EventTable } from '../../event-table/entities/event-table.entity';
import { ProgrammTable } from '../../programm-table/entities/programm-table.entity';
import { SchoolTable } from '../../school-table/entities/school-table.entity';

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

  @BelongsToMany(() => AccountTable, () => Account_DependencyTable)
  accounts: AccountTable[];

  @HasMany(() => SchoolTable)
  schools: SchoolTable[];

  @HasMany(() => EventTable)
  events: Event[];

  @HasMany(() => ProgrammTable)
  programms: ProgrammTable[];

  @HasMany(() => AboutDependencyTable)
  about_dependencies: AboutDependencyTable[];
}

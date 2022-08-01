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
import { AboutDependency } from 'src/modules/about_dependency/entities/about_dependency.entity';
import { Account } from 'src/modules/account/entities/account.entity';
import { Account_Dependency } from 'src/modules/account/entities/account_dependency.entity';
import { DependencyType } from 'src/modules/dependency_type/entities/dependency_type.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Programm } from 'src/modules/programm/entities/programm.entity';
import { School } from 'src/modules/school/entities/school.entity';

export interface DependencyCreateAttr {
  name: string;
  short_name: string;
  dependency_type_id: number;
}

@Table({ tableName: 'dependency', createdAt: false, updatedAt: false })
export class Dependency extends Model<Dependency, DependencyCreateAttr> {
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
  @ForeignKey(() => DependencyType)
  dependency_type_id: number;

  @BelongsTo(() => DependencyType)
  dependency_type: DependencyType;

  @BelongsToMany(() => Account, () => Account_Dependency)
  accounts: Account[];

  @HasMany(() => School)
  schools: School[];

  @HasMany(() => Event)
  events: Event[];

  @HasMany(() => Programm)
  programms: Programm[];

  @HasMany(() => AboutDependency)
  about_dependencies: AboutDependency[];
}

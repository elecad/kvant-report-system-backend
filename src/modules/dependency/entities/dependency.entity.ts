import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/modules/account/entities/account.entity';
import { Account_Dependency } from 'src/modules/account/entities/account_dependency.entity';
import { DependencyType } from 'src/modules/dependency_type/entities/dependency_type.entity';

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
  dependencyType: DependencyType;

  @BelongsToMany(() => Account, () => Account_Dependency)
  accounts: Account[];
}

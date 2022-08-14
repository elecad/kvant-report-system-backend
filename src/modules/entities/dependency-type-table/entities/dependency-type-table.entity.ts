import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface DependencyTypeTableCreateAttr {
  name: string;
  code_name: string;
}

@Table({ tableName: 'dependency_type', createdAt: false, updatedAt: false })
export class DependencyTypeTable extends Model<
  DependencyTypeTable,
  DependencyTypeTableCreateAttr
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

  // @HasMany(() => Dependency)
  // dependencies: Dependency[];
}

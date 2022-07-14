import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface DependencyTypeCreateAttr {
  name: string;
}

@Table({ tableName: 'dependency_type', createdAt: false, updatedAt: false })
export class DependencyType extends Model<
  DependencyType,
  DependencyTypeCreateAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}

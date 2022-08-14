import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface RoleTableCreateAttr {
  name: string;
  code_name: string;
  description: string;
}

@Table({ tableName: 'role', createdAt: false, updatedAt: false })
export class RoleTable extends Model<RoleTable, RoleTableCreateAttr> {
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

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  // @BelongsToMany(() => AccountTable, () => Account_Role)
  // accounts: Account[];
}

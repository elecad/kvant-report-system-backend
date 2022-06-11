import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AccountCraateAttr {
  mail: string;
  password: string;
  FIO: string;
}

@Table({ tableName: 'account' })
export class Account extends Model<Account, AccountCraateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  mail: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  FIO: string;
}

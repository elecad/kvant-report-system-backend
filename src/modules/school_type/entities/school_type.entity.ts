import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { School } from 'src/modules/school/entities/school.entity';

export interface SchoolTypeCreateAttr {
  name: string;
}

@Table({ tableName: 'school_type', createdAt: false, updatedAt: false })
export class SchoolType extends Model<SchoolType, SchoolTypeCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => School)
  schools: School[];
}

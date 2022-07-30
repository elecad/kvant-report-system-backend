import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Dependency } from 'src/modules/dependency/entities/dependency.entity';
import { Programm } from 'src/modules/programm/entities/programm.entity';
import { SchoolType } from 'src/modules/school_type/entities/school_type.entity';

export interface SchoolCreateAttr {
  name: string;
  adress: string;
  dependency_id: number;
  school_type_id: number;
}
@Table({ tableName: 'school', createdAt: false, updatedAt: false })
export class School extends Model<School, SchoolCreateAttr> {
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
  @ForeignKey(() => Dependency)
  dependency_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => SchoolType)
  school_type_id: number;

  @BelongsTo(() => SchoolType)
  school_type: SchoolType;

  @BelongsTo(() => Dependency)
  dependency: Dependency;

  @HasMany(() => Programm)
  programms: Programm[];
}

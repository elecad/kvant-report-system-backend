import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { AboutProgrammTable } from '../../about-programm-table/entities/about-programm-table.entity';
import { DependencyTable } from '../../dependency-table/entities/dependency-table.entity';
import { DirectionTable } from '../../direction-table/entities/direction-table.entity';
import { SchoolTable } from '../../school-table/entities/school-table.entity';

export interface ProgrammTableCreateAttr {
  name: string;
  navigator_id: number;
  start_age: number;
  end_age: number;
  dependency_id: number;
  direction_id: number;
  school_id: number;
}

@Table({ tableName: 'programm', createdAt: false, updatedAt: false })
export class ProgrammTable extends Model<
  ProgrammTable,
  ProgrammTableCreateAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  navigator_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  start_age: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  end_age: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => DependencyTable)
  dependency_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => DirectionTable)
  direction_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => SchoolTable)
  school_id: number;

  @BelongsTo(() => DependencyTable)
  dependency: DependencyTable;

  @BelongsTo(() => DirectionTable)
  direction: DirectionTable;

  @BelongsTo(() => SchoolTable)
  school: SchoolTable;

  @HasMany(() => AboutProgrammTable)
  about_programms: AboutProgrammTable[];
}

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { AboutProgramm } from 'src/modules/about_programm/entities/about_programm.entity';
import { Dependency } from 'src/modules/dependency/entities/dependency.entity';
import { Direction } from 'src/modules/direction/entities/direction.entity';
import { School } from 'src/modules/school/entities/school.entity';

export interface ProgrammCreateAttr {
  name: string;
  navigator_id: number;
  start_age: number;
  end_age: number;
  dependency_id: number;
  direction_id: number;
  school_id: number;
}

@Table({ tableName: 'programm', createdAt: false, updatedAt: false })
export class Programm extends Model<Programm, ProgrammCreateAttr> {
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
  @ForeignKey(() => Dependency)
  dependency_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Direction)
  direction_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => School)
  school_id: number;

  @BelongsTo(() => Dependency)
  dependency: Dependency;

  @BelongsTo(() => Direction)
  direction: Direction;

  @BelongsTo(() => School)
  school: School;

  @HasMany(() => AboutProgramm)
  about_programms: AboutProgramm[];
}

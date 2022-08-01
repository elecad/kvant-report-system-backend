import { Injectable } from '@nestjs/common';
import { AboutDependency } from 'src/modules/about_dependency/entities/about_dependency.entity';
import { Account } from 'src/modules/account/entities/account.entity';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { DataOfType } from 'src/modules/data_of_type/entities/data_of_type.entity';
import { Dependency } from 'src/modules/dependency/entities/dependency.entity';
import { DependencyType } from 'src/modules/dependency_type/entities/dependency_type.entity';
import {
  Direction,
  DirectionCreateAttr,
} from 'src/modules/direction/entities/direction.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Programm } from 'src/modules/programm/entities/programm.entity';
import { Report } from 'src/modules/report/entities/report.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { School } from 'src/modules/school/entities/school.entity';
import { SchoolType } from 'src/modules/school_type/entities/school_type.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { SQL } from './query';

@Injectable()
export class TestService {
  async create() {
    await this.clear();

    await this.createAccount();
    await this.createDepenpency();
    await this.createEvent();
    await this.createSchool();
    await this.createDirection();
    await this.createProgramm();
    await this.createTask();
    await this.createReport();
    await this.createDataOfType();
    await this.createAnswer();
  }

  private async clear() {
    const sequelize = Account.sequelize;
    await sequelize.query(SQL.deleteAll);
    await sequelize.sync();
  }

  private async createAccount() {
    const adminRole = await Role.create({
      name: 'Администратор',
      description: 'Самая главная роль в web-приложении',
      code_name: 'admin',
    });

    const userRole = await Role.create({
      name: 'Пользователь',
      description: 'Обычный пользователь приложения',
      code_name: 'user',
    });

    const admin = await Account.create({
      email: 'admin@mail.ru',
      password: 'admin',
      surname: 'Горшков',
      name: 'Сергей',
      middlename: 'Юрьевич',
    });

    admin.$set('roles', adminRole);
    admin.$set('roles', userRole);

    const user1 = await Account.create({
      email: 'user1@mail.ru',
      password: 'user',
      surname: 'Белова',
      name: 'Юлия',
      middlename: 'Сергеевна',
    });

    user1.$set('roles', userRole);

    const user2 = await Account.create({
      email: 'user2@mail.ru',
      password: 'user',
      surname: 'Лобов',
      name: 'Павел',
      middlename: 'Викторович',
    });

    user2.$set('roles', userRole);

    const user3 = await Account.create({
      email: 'user3@mail.ru',
      password: 'user',
      surname: 'Торников',
      name: 'Максим',
      middlename: 'Алексеевич',
    });

    user3.$set('roles', userRole);

    await Session.create({
      token: '4077b499-14d5-422d-b5fa-ab17ae131c51',
      account_id: 1,
    });
  }

  private async createDepenpency() {
    const admin = await Account.findByPk(1);
    const user1 = await Account.findByPk(2);
    const user2 = await Account.findByPk(3);
    const user3 = await Account.findByPk(4);

    const areaType = await DependencyType.create({ name: 'Район' });
    const schoolType = await DependencyType.create({
      name: 'Учереждение дополнительного образования',
    });

    const dependency1 = await Dependency.create({
      name: 'Белгородский район',
      short_name: 'Бел. район',
      dependency_type_id: areaType.id,
    });

    const dependency2 = await Dependency.create({
      name: 'Муниципальное бюджетное учреждение дополнительного образования «Станция юных техников Новооскольского района Белгородской области»',
      short_name: 'СЮТНР',
      dependency_type_id: schoolType.id,
    });

    await admin.$set('dependencies', [dependency1, dependency2]);

    const dependency3 = await Dependency.create({
      name: 'Муниципальное бюджетное учреждение дополнительного образования «Центр детского (юношеского) технического творчества №2»',
      short_name: 'ЦДТТ№2',
      dependency_type_id: schoolType.id,
    });

    const dependency4 = await Dependency.create({
      name: 'Ракитянский район',
      short_name: 'Ракит. район',
      dependency_type_id: areaType.id,
    });

    await user1.$set('dependencies', [dependency3, dependency4]);

    await user2.$set('dependencies', [dependency4]);
  }

  private async createEvent() {
    await Event.create({
      name: 'День Николы Тесла',
      date: new Date(),
      description: 'Праздник Николы Тесла',
      dependency_id: 1,
    });

    await Event.create({
      name: 'День Рождения Кванториума',
      date: new Date(),
      description: 'Кванториуму 6 лет!',
      dependency_id: 2,
    });
  }

  private async createSchool() {
    const type1 = await SchoolType.create({
      name: 'Учреждение дошкольного образования',
    });

    const type2 = await SchoolType.create({
      name: 'Общеобразовательное учреждение',
    });

    const type3 = await SchoolType.create({
      name: 'Учреждение дополнительного образования',
    });

    const type4 = await SchoolType.create({
      name: 'Среднее профессиональное общеобразовательное учреждение',
    });

    const school1 = await School.create({
      name: 'МБОУ СОШ №42',
      adress: 'Улица Спортивная',
      school_type_id: type2.id,
      dependency_id: 1,
    });

    const school2 = await School.create({
      name: 'Кванториум Есенина',
      adress: 'Улица Есенина',
      school_type_id: type3.id,
      dependency_id: 1,
    });
  }

  private async createDirection() {
    [
      'Информационные технологии',
      'Картинг',
      'Начальное техническое моделирование',
      'Парапланеризм',
      'Программирование',
      'Радиотехника, радиоэлектроника',
      'Мультимедиа студии и киностудии',
      'Моделирование',
      'Робототехника',
      '3D моделирование, прототипирование',
      'Макетирование и проектирование в архитектуре',
      'Прочее',
    ].forEach((el) => {
      Direction.create({ name: el });
    });
  }

  private async createProgramm() {
    Programm.create({
      name: '3D моделирование',
      navigator_id: 1293,
      start_age: 12,
      end_age: 17,
      dependency_id: 2,
      direction_id: 1,
      school_id: 1,
    });

    Programm.create({
      name: 'Лего - мастер',
      navigator_id: 1234,
      start_age: 12,
      end_age: 17,
      dependency_id: 2,
      direction_id: 2,
      school_id: 2,
    });

    Programm.create({
      name: 'Автомодельный спорт',
      navigator_id: 1293,
      start_age: 12,
      end_age: 17,
      dependency_id: 2,
      direction_id: 1,
      school_id: 1,
    });

    Programm.create({
      name: 'Юный архитектор',
      navigator_id: 1234,
      start_age: 12,
      end_age: 17,
      dependency_id: 2,
      direction_id: 2,
      school_id: 2,
    });
  }

  private async createTask() {
    await Task.create({ year: 2021, author_id: 1, half_year: 1 });
    await Task.create({ year: 2021, author_id: 1, half_year: 2 });
    await Task.create({ year: 2022, author_id: 1, half_year: 1 });
  }

  private async createReport() {
    await Report.create({ name: 'Таблица №2' });
    await Report.create({ name: 'Таблица №7.1' });
    await Report.create({ name: 'Таблица №7.2' });
  }

  private async createDataOfType() {
    await DataOfType.create({
      code_name: 't2_c3',
      description: 'Всего детей 5-18 лет',
      report_id: 1,
    });
    await DataOfType.create({
      code_name: 't2_c4',
      description: 'Учреждения дошкольного образования (по ДО(О)П)',
      report_id: 1,
    });
    await DataOfType.create({
      code_name: 't2_c5',
      description: 'Учреждения дошкольного образования (по АДО(О)П)',
      report_id: 1,
    });
    await DataOfType.create({
      code_name: 't2_c6',
      description: 'Общеобразовательные учреждения (по ДО(О)П)',
      report_id: 1,
    });
    await DataOfType.create({
      code_name: 't2_c7',
      description: 'Общеобразовательные учреждения (по АДО(О)П)',
      report_id: 1,
    });
    await DataOfType.create({
      code_name: 't2_c8',
      description: 'Учреждения дополнительного образования (по ДО(О)П)',
      report_id: 1,
    });
    await DataOfType.create({
      code_name: 't2_c9',
      description: 'Учреждения дополнительного образования (по АДО(О)П)',
      report_id: 1,
    });
    await DataOfType.create({
      code_name: 't2_c10',
      description:
        'Учреждения среднего проффесионального образования (по ДО(О)П)',
      report_id: 1,
    });
    await DataOfType.create({
      code_name: 't2_c11',
      description:
        'Учреждения среднего проффесионального образования (по АДО(О)П)',
      report_id: 1,
    });
    await DataOfType.create({
      code_name: 't2_c12',
      description: 'Всего в территории (сумма ст. 4-9)',
      report_id: 1,
    });
    await DataOfType.create({
      code_name: 't2_c13',
      description: '% охвата детей техническим творчеством',
      report_id: 1,
    });

    await DataOfType.create({
      code_name: 't7_1_c1',
      description: 'Всего детей технической направленности (по ДО(О)П)',
      report_id: 2,
    });
    await DataOfType.create({
      code_name: 't7_1_c2',
      description: 'Всего детей технической направленности (по АДО(О)П)',
      report_id: 2,
    });
    await DataOfType.create({
      code_name: 't7_1_c2',
      description: 'Всего детей технической направленности (Итого)',
      report_id: 2,
    });

    await DataOfType.create({
      code_name: 't7_2_c1',
      description: 'Количество человек, обучающихся по программам',
      report_id: 3,
    });
  }

  private async createAnswer() {
    await Answer.create({
      responder_id: 1,
      task_id: 1,
    });

    await Answer.create({
      responder_id: 2,
      task_id: 1,
    });

    await AboutDependency.create({
      answer_id: 1,
      data_of_type_id: 1,
      dependency_id: 1,
      value: 1,
    });
    await AboutDependency.create({
      answer_id: 1,
      data_of_type_id: 2,
      dependency_id: 1,
      value: 1,
    });
  }
}

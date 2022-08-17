import { Injectable } from '@nestjs/common';
import { AboutDependencyTable } from 'src/modules/entities/about-dependency-table/entities/about-dependency-table.entity';
import { AccountTable } from 'src/modules/entities/account-table/entities/account-table.entity';
import { AnswerTable } from 'src/modules/entities/answer-table/entities/answer-table.entity';
import { DataOfTypeTable } from 'src/modules/entities/data-of-type-table/entities/data-of-type-table.entity';
import { DependencyTable } from 'src/modules/entities/dependency-table/entities/dependency-table.entity';
import { DependencyTypeTable } from 'src/modules/entities/dependency-type-table/entities/dependency-type-table.entity';
import { DirectionTable } from 'src/modules/entities/direction-table/entities/direction-table.entity';
import { EventTable } from 'src/modules/entities/event-table/entities/event-table.entity';
import { ProgrammTable } from 'src/modules/entities/programm-table/entities/programm-table.entity';
import { ReportTemplateTable } from 'src/modules/entities/report-template-table/entities/report-template-table.entity';
import { RoleTable } from 'src/modules/entities/role-table/entities/role-table.entity';
import { SchoolTable } from 'src/modules/entities/school-table/entities/school-table.entity';
import { SchoolTypeTable } from 'src/modules/entities/school-type-table/entities/school-type-table.entity';
import { SessionTable } from 'src/modules/entities/session-table/entities/session-table.entity';
import { TaskTable } from 'src/modules/entities/task-table/entities/task-table.entity';
import { SQL } from './sql-query';

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
    const sequelize = AccountTable.sequelize;
    await sequelize.query(SQL.deleteAll);
    await sequelize.sync();
  }

  private async createAccount() {
    const adminRole = await RoleTable.create({
      name: 'Администратор',
      description: 'Самая главная роль в web-приложении',
      code_name: 'admin',
    });

    const userRole = await RoleTable.create({
      name: 'Пользователь',
      description: 'Обычный пользователь приложения',
      code_name: 'user',
    });

    const admin = await AccountTable.create({
      email: 'admin@mail.ru',
      password: 'admin',
      surname: 'Горшков',
      name: 'Сергей',
      middlename: 'Юрьевич',
    });

    admin.$set('roles', adminRole);
    admin.$set('roles', userRole);

    const user1 = await AccountTable.create({
      email: 'user1@mail.ru',
      password: 'user',
      surname: 'Белова',
      name: 'Юлия',
      middlename: 'Сергеевна',
    });

    user1.$set('roles', userRole);

    const user2 = await AccountTable.create({
      email: 'user2@mail.ru',
      password: 'user',
      surname: 'Лобов',
      name: 'Павел',
      middlename: 'Викторович',
    });

    user2.$set('roles', userRole);

    const user3 = await AccountTable.create({
      email: 'user3@mail.ru',
      password: 'user',
      surname: 'Торников',
      name: 'Максим',
      middlename: 'Алексеевич',
    });

    user3.$set('roles', userRole);

    await SessionTable.create({
      token: '4077b499-14d5-422d-b5fa-ab17ae131c51',
      account_id: 1,
    });
  }

  private async createDepenpency() {
    const admin = await AccountTable.findByPk(1);
    const user1 = await AccountTable.findByPk(2);
    const user2 = await AccountTable.findByPk(3);
    const user3 = await AccountTable.findByPk(4);

    const areaType = await DependencyTypeTable.create({
      name: 'Район',
      code_name: 'area',
    });
    const schoolType = await DependencyTypeTable.create({
      name: 'Учереждение дополнительного образования',
      code_name: 'school',
    });

    const dependency1 = await DependencyTable.create({
      name: 'Белгородский район',
      short_name: 'Бел. район',
      dependency_type_id: areaType.id,
    });

    const dependency2 = await DependencyTable.create({
      name: 'Муниципальное бюджетное учреждение дополнительного образования «Станция юных техников Новооскольского района Белгородской области»',
      short_name: 'СЮТНР',
      dependency_type_id: schoolType.id,
    });

    await admin.$set('dependencies', [dependency1, dependency2]);

    const dependency3 = await DependencyTable.create({
      name: 'Муниципальное бюджетное учреждение дополнительного образования «Центр детского (юношеского) технического творчества №2»',
      short_name: 'ЦДТТ№2',
      dependency_type_id: schoolType.id,
    });

    const dependency4 = await DependencyTable.create({
      name: 'Ракитянский район',
      short_name: 'Ракит. район',
      dependency_type_id: areaType.id,
    });

    await user1.$set('dependencies', [dependency3, dependency4]);

    await user2.$set('dependencies', [dependency4]);
  }

  private async createEvent() {
    await EventTable.create({
      name: 'День Николы Тесла',
      date: new Date(),
      description: 'Праздник Николы Тесла',
      dependency_id: 1,
    });

    await EventTable.create({
      name: 'День Рождения Кванториума',
      date: new Date(),
      description: 'Кванториуму 6 лет!',
      dependency_id: 2,
    });
  }

  private async createSchool() {
    const type1 = await SchoolTypeTable.create({
      name: 'Учреждение дошкольного образования',
      code_name: 'УДО',
    });

    const type2 = await SchoolTypeTable.create({
      name: 'Общеобразовательное учреждение',
      code_name: 'ОУ',
    });

    const type3 = await SchoolTypeTable.create({
      name: 'Учреждение дополнительного образования',
      code_name: 'УДОО',
    });

    const type4 = await SchoolTypeTable.create({
      name: 'Среднее профессиональное общеобразовательное учреждение',
      code_name: 'СПО',
    });

    const school1 = await SchoolTable.create({
      name: 'МБОУ СОШ №42',
      adress: 'Улица Спортивная',
      school_type_id: type2.id,
      dependency_id: 1,
    });

    const school2 = await SchoolTable.create({
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
      DirectionTable.create({ name: el });
    });
  }

  private async createProgramm() {
    ProgrammTable.create({
      name: '3D моделирование',
      navigator_id: 1293,
      start_age: 12,
      end_age: 17,
      dependency_id: 2,
      direction_id: 1,
      school_id: 1,
    });

    ProgrammTable.create({
      name: 'Лего - мастер',
      navigator_id: 1234,
      start_age: 12,
      end_age: 17,
      dependency_id: 2,
      direction_id: 2,
      school_id: 2,
    });

    ProgrammTable.create({
      name: 'Автомодельный спорт',
      navigator_id: 1293,
      start_age: 12,
      end_age: 17,
      dependency_id: 2,
      direction_id: 1,
      school_id: 1,
    });

    ProgrammTable.create({
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
    await TaskTable.create({ year: 2021, author_id: 1, half_year: 1 });
    await TaskTable.create({ year: 2021, author_id: 1, half_year: 2 });
    await TaskTable.create({ year: 2022, author_id: 1, half_year: 1 });
  }

  private async createReport() {
    await ReportTemplateTable.create({
      name: 'Таблица №2',
      code_name: 'table2',
    });
    await ReportTemplateTable.create({
      name: 'Таблица №7.1',
      code_name: 'table71',
    });
    await ReportTemplateTable.create({
      name: 'Таблица №7.2',
      code_name: 'table72',
    });
  }

  private async createDataOfType() {
    await DataOfTypeTable.create({
      code_name: 't2_c3',
      description: 'Всего детей 5-18 лет',
      template_id: 1,
    });
    await DataOfTypeTable.create({
      code_name: 't2_c4',
      description: 'Учреждения дошкольного образования (по ДО(О)П)',
      template_id: 1,
    });
    await DataOfTypeTable.create({
      code_name: 't2_c5',
      description: 'Учреждения дошкольного образования (по АДО(О)П)',
      template_id: 1,
    });
    await DataOfTypeTable.create({
      code_name: 't2_c6',
      description: 'Общеобразовательные учреждения (по ДО(О)П)',
      template_id: 1,
    });
    await DataOfTypeTable.create({
      code_name: 't2_c7',
      description: 'Общеобразовательные учреждения (по АДО(О)П)',
      template_id: 1,
    });
    await DataOfTypeTable.create({
      code_name: 't2_c8',
      description: 'Учреждения дополнительного образования (по ДО(О)П)',
      template_id: 1,
    });
    await DataOfTypeTable.create({
      code_name: 't2_c9',
      description: 'Учреждения дополнительного образования (по АДО(О)П)',
      template_id: 1,
    });
    await DataOfTypeTable.create({
      code_name: 't2_c10',
      description:
        'Учреждения среднего проффесионального образования (по ДО(О)П)',
      template_id: 1,
    });
    await DataOfTypeTable.create({
      code_name: 't2_c11',
      description:
        'Учреждения среднего проффесионального образования (по АДО(О)П)',
      template_id: 1,
    });
    await DataOfTypeTable.create({
      code_name: 't2_c12',
      description: 'Всего в территории (сумма ст. 4-9)',
      template_id: 1,
    });
    await DataOfTypeTable.create({
      code_name: 't2_c13',
      description: '% охвата детей техническим творчеством',
      template_id: 1,
    });

    await DataOfTypeTable.create({
      code_name: 't7_1_c1',
      description: 'Всего детей технической направленности (по ДО(О)П)',
      template_id: 2,
    });
    await DataOfTypeTable.create({
      code_name: 't7_1_c2',
      description: 'Всего детей технической направленности (по АДО(О)П)',
      template_id: 2,
    });
    await DataOfTypeTable.create({
      code_name: 't7_1_c3',
      description: 'Всего детей технической направленности (Итого)',
      template_id: 2,
    });

    await DataOfTypeTable.create({
      code_name: 't7_2_c1',
      description: 'Количество человек, обучающихся по программам',
      template_id: 3,
    });
  }

  private async createAnswer() {
    await AnswerTable.create({
      responder_id: 1,
      task_id: 1,
    });

    await AnswerTable.create({
      responder_id: 2,
      task_id: 1,
    });

    await AboutDependencyTable.create({
      answer_id: 1,
      data_of_type_id: 1,
      dependency_id: 1,
      value: 1,
    });
    await AboutDependencyTable.create({
      answer_id: 1,
      data_of_type_id: 2,
      dependency_id: 1,
      value: 1,
    });
  }
}

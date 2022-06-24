import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Account } from 'src/entity/account/account.model';
import { Answer } from 'src/entity/answer/answer.model';
import { DataTypes } from 'src/entity/data_types/data_types.model';
import { Direction } from 'src/entity/direction/direction.model';
import { Event } from 'src/entity/event/event.model';
import { Place } from 'src/entity/place/place.model';
import { PlaceData } from 'src/entity/place_data/place_data.model';
import { PlaceType } from 'src/entity/place_type/place_type.model';
import { Programm } from 'src/entity/programm/programm.model';
import { Role } from 'src/entity/role/role.model';
import { SchoolType } from 'src/entity/school_type/school_type.model';
import { Task } from 'src/entity/task/task.model';
import { QUERY } from './query';

@Injectable()
export class TestService {
  async create() {
    await this.clear();

    await this.createAccount();
    await this.createTypePlace();
    await this.createDirection();
    await this.createSchoolType();
    await this.createPlace();
    await this.createProgramm();
    await this.createDataType();
    await this.createTask();
    await this.createAnswer();
  }

  async clear() {
    await Account.sequelize.query(QUERY.deleteAll);
    await Account.sequelize.sync();
  }

  async createAccount() {
    const adminRole = await Role.create({
      name: 'Администратор',
      code_name: 'ADMIN',
      description: 'Главная роль в приложении',
    });

    const userRole = await Role.create({
      name: 'Пользователь',
      code_name: 'USER',
      description: 'Обычный пользователь',
    });

    const admin = await Account.create({
      mail: 'admin@mail.ru',
      password: 'admin',
      FIO: 'Петренко Пётр Петрович',
    });
    admin.$set('roles', adminRole);

    const user1 = await Account.create({
      mail: 'user1@mail.ru',
      password: 'user',
      FIO: 'Павленко Сергей Петрович',
    });
    user1.$set('roles', userRole);

    const user2 = await Account.create({
      mail: 'user2@mail.ru',
      password: 'user',
      FIO: 'Бромов Антон Павлович',
    });
    user2.$set('roles', userRole);

    const user3 = await Account.create({
      mail: 'user3@mail.ru',
      password: 'user',
      FIO: 'Борисова Мария Степановна',
    });
    user3.$set('roles', userRole);
  }

  async createTypePlace() {
    await PlaceType.create({ name: 'Район' });
    await PlaceType.create({ name: 'Учреждение' });
  }

  async createDirection() {
    [
      'Информационные технологии',
      'Картинг',
      'Начальное техническое моделирование',
      'Парапланеризм',
      'Программирование',
      'Радиотехника, радиоэлектроника',
      'Мультимедиа студии и киностудии',
      'Моделирование (авиамоделирование, судомоделирование, автомоделирование и т.д.)',
      'Робототехника',
      '3D моделирование, прототипирование',
      'Макетирование и проектирование в архитектуре',
      'Прочее',
    ].forEach((el) => {
      Direction.create({ name: el });
    });
  }

  async createSchoolType() {
    [
      'Учреждение дошкольного образования',
      'Общеобразовательное учреждение',
      'Учреждение дополнительного образования',
      'Учреждение СПО',
    ].forEach((el) => {
      SchoolType.create({ name: el });
    });
  }

  async createPlace() {
    const area = await PlaceType.findOne({ where: { name: 'Район' } });
    const school = await PlaceType.findOne({
      where: { name: 'Учреждение' },
    });
    [
      'Алексеевский ГО',
      'Белгородский район',
      'Борисовский район',
      'Валуйский ГО',
      'Вейделевский район',
      'Волоконовский район',
      'Грайворонский ГО',
      'Губкинский ГО',
      'Ивнянский район',
      'Корочанский район',
      'Красненский район',
      'Красногвардейский район',
      'Краснояружский район',
      'Новооскольский ГО',
      'Прохоровский район',
      'Ракитянский район',
      'Ровеньский район район',
      'Старооскольский ГО',
      'Чернянский район',
      'Шебекинский ГО',
      'Яковлевский ГО',
      'Городской округ «Город Белгород»',
      'ГБУ ДО БелОЦД(Ю)ТТ',
    ].forEach(async (el) => {
      await Place.create({ name: el, place_type_id: area.id });
    });
    [
      'Муниципальное бюджетное учреждение дополнительного образования «Станция юных техников» Алексеевского городского округа',
      'МУ ДО ВГСЮТ',
      'Муниципальное бюджетное учреждение дополнительного образования «Станция юных техников» города Губкина Белгородской области',
      'Муниципальное бюджетное учреждение дополнительного образования «Станция юных техников Новооскольского района Белгородской области»',
      'Муниципальное бюджетное учреждение дополнительного образования «Центр детского (юношеского) технического творчества №2»',
      'Муниципальное бюджетное учреждение дополнительного образования» Центр технического творчества и профессионального обучения»',
      'Муниципальное бюджетное учреждение дополнительного образования «Центр технологического образования и детского технического творчества» г. Белгорода',
    ].forEach(async (el) => {
      await Place.create({ name: el, place_type_id: school.id });
    });

    [
      {
        name: 'Праздник Народного Единства с Роботами',
        date: new Date(),
        description: 'Какое-то мероприятие для детей с роботами 1',
        place_id: 1,
      },
      {
        name: 'Праздник Робота',
        date: new Date(),
        description: 'Какое-то мероприятие для детей с роботами 2',
        place_id: 1,
      },
      {
        name: 'Праздник Большого числа ПИ',
        date: new Date(),
        description: 'Какое-то мероприятие для детей с роботами 3 ',
        place_id: 3,
      },
      {
        name: 'Праздник Ньютана',
        date: new Date(),
        description: 'Какое-то мероприятие для детей с роботами 5 ',
        place_id: 4,
      },
    ].forEach(async (el) => {
      await Event.create(el);
    });

    const admin = await Account.findOne({ where: { mail: 'admin@mail.ru' } });
    const user1 = await Account.findOne({ where: { mail: 'user1@mail.ru' } });
    const user2 = await Account.findOne({ where: { mail: 'user2@mail.ru' } });
    const user3 = await Account.findOne({ where: { mail: 'user3@mail.ru' } });

    admin.$set('places', [1]);
    admin.$set('places', [2]);
    user1.$set('places', [25]);
    user2.$set('places', [3]);
    user2.$set('places', [4]);
    user2.$set('places', [5]);
    user2.$set('places', [24]);
    user3.$set('places', [6]);
  }

  async createProgramm() {
    [
      {
        name: 'Авиамоделирование',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №1',
        school_type_id: 2,
      },
      {
        name: 'Автомоделирование',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №2',
        school_type_id: 2,
      },
      {
        name: 'Судомоделирование',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №3',
        school_type_id: 2,
      },
      {
        name: 'ИОМ «Азбука судомоделизма»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №4',
        school_type_id: 2,
      },
      {
        name: 'Картинг',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №5',
        school_type_id: 2,
      },
      {
        name: 'Ракетомоделирование',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №6',
        school_type_id: 2,
      },
      {
        name: 'Короткая волна',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №7',
        school_type_id: 2,
      },
      {
        name: 'НТМ',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №8',
        school_type_id: 2,
      },
      {
        name: 'Юный техник',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №9',
        school_type_id: 2,
      },
      {
        name: 'АДО(О)П «3d-мастер»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №10',
        school_type_id: 2,
      },
      {
        name: 'Основы электротехники',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №11',
        school_type_id: 2,
      },
      {
        name: 'Кадр',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №12',
        school_type_id: 2,
      },
      {
        name: 'Волшебная 3D ручка',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №13',
        school_type_id: 2,
      },
      {
        name: 'Техническое моделирование',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №14',
        school_type_id: 2,
      },
      {
        name: 'Алые паруса',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №15',
        school_type_id: 2,
      },
      {
        name: 'Самоделкин',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №16',
        school_type_id: 2,
      },
      {
        name: 'ИОМ «Алые паруса»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №17',
        school_type_id: 2,
      },
      {
        name: 'Синематоша',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №18',
        school_type_id: 2,
      },
      {
        name: 'ИОМ «Объектив»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №19',
        school_type_id: 2,
      },
      {
        name: 'Мастерская Самоделкина',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №20',
        school_type_id: 2,
      },
      {
        name: 'Умелые ручки',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №21',
        school_type_id: 2,
      },
      {
        name: 'Светофорчик',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №22',
        school_type_id: 2,
      },
      {
        name: 'Бисеринка',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №23',
        school_type_id: 2,
      },
      {
        name: 'Мастерица',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №24',
        school_type_id: 2,
      },
      {
        name: 'Художественное конструирование',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №25',
        school_type_id: 2,
      },
      {
        name: 'Арт-декор',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №26',
        school_type_id: 2,
      },
      {
        name: 'Конструирование поделок',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №27',
        school_type_id: 2,
      },
      {
        name: 'ИОМ «Радуга идей»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 24,
        school: 'Учреждение №28',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Автомодельный»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №1',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Автоконструипрование»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №2',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Авиатор»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №3',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Авиамодельный»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №4',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Картинг»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №5',
        school_type_id: 2,
      },
      {
        name: 'ДООП «КартингСтарт»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №6',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Конструирование военной техники»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №7',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Компьютерия»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №8',
        school_type_id: 2,
      },
      {
        name: 'АДООП «Компьютерия» для детей с РАС',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №9',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Компьютерные технологии»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №10',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Моделист-конструктор (плюс)»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №11',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Моделист-конструктор»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №12',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Юный техник»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №13',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Город мастеров»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №14',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Судостроитель»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №15',
        school_type_id: 2,
      },
      {
        name: 'ДООП «Алые паруса»',
        navigator_id: 1,
        start_age: 7,
        end_age: 17,
        direction_id: 8,
        place_id: 26,
        school: 'Учреждение №16',
        school_type_id: 2,
      },
    ].forEach((el) => Programm.create(el));
  }

  async createDataType() {
    [
      {
        code_name: 't2_c3',
        description: 'Всего детей 5-18 лет',
        place_type_id: 1,
      },
      {
        code_name: 't2_c4',
        description: 'Учреждения дошкольного образования (по ДО(О)П)',
        place_type_id: 1,
      },
      {
        code_name: 't2_c5',
        description: 'Учреждения дошкольного образования (по АДО(О)П)',
        place_type_id: 1,
      },
      {
        code_name: 't2_c6',
        description: 'Общеобразовательные учреждения (по ДО(О)П )',
        place_type_id: 1,
      },
      {
        code_name: 't2_c7',
        description: 'Общеобразовательные учреждения (по АДО(О)П)',
        place_type_id: 1,
      },
      {
        code_name: 't2_c8',
        description: 'Учреждения дополнительного образования (по ДО(О)П)',
        place_type_id: 1,
      },
      {
        code_name: 't2_c9',
        description: 'Учреждения дополнительного образования (по АДО(О)П)',
        place_type_id: 1,
      },
      {
        code_name: 't2_c10',
        description:
          'Учреждения среднего профессионального образования (по ДО(О)П)',
        place_type_id: 1,
      },
      {
        code_name: 't2_c11',
        description:
          'Учреждения среднего профессионального образования (по АДО(О)П)',
        place_type_id: 1,
      },
      {
        code_name: 't2_c12',
        description: 'Всего в территории',
        place_type_id: 1,
      },
      {
        code_name: 't2_c13',
        description: '% охвата детей техническим творчеством',
        place_type_id: 1,
      },
      {
        code_name: 't7_1_c1',
        description: 'Всего детей технической направленности (по ДО(О)П)',
        place_type_id: 2,
      },
      {
        code_name: 't7_1_c2',
        description: 'Всего детей технической направленности (по АДО(О)П)',
        place_type_id: 2,
      },
      {
        code_name: 't7_1_c3',
        description: 'Всего детей технической направленности (Всего)',
        place_type_id: 2,
      },
      {
        code_name: 't7_2',
        description: 'Количество человек, обучающихся по программаме',
        place_type_id: 2,
      },
    ].forEach((el) => {
      DataTypes.create(el);
    });
  }

  async createTask() {
    const admin = await Account.findOne({ where: { mail: 'admin@mail.ru' } });
    [
      {
        year: 2022,
        half_year: 1,
        account_id: admin.id,
      },
      {
        year: 2021,
        half_year: 2,
        account_id: admin.id,
      },
      {
        year: 2021,
        half_year: 1,
        account_id: admin.id,
      },
    ].forEach((el) => Task.create(el));
  }

  async createAnswer() {
    const user = await Account.findOne({ where: { mail: 'user2@mail.ru' } });

    const answer = await Answer.create({ account_id: user.id, task_id: 1 });

    [
      { data_type_id: 1, answer_id: answer.id, place_id: 6, value: 3261 },
      { data_type_id: 2, answer_id: answer.id, place_id: 6, value: 29 },
      { data_type_id: 3, answer_id: answer.id, place_id: 6, value: 0 },
      { data_type_id: 4, answer_id: answer.id, place_id: 6, value: 369 },
      { data_type_id: 5, answer_id: answer.id, place_id: 6, value: 369 },
      { data_type_id: 6, answer_id: answer.id, place_id: 6, value: 30 },
      { data_type_id: 7, answer_id: answer.id, place_id: 6, value: 0 },
      { data_type_id: 8, answer_id: answer.id, place_id: 6, value: 10 },
      { data_type_id: 9, answer_id: answer.id, place_id: 6, value: 0 },
      { data_type_id: 10, answer_id: answer.id, place_id: 6, value: 428 },
      { data_type_id: 11, answer_id: answer.id, place_id: 6, value: 15 },
    ].forEach((el) => PlaceData.create(el));
  }
}

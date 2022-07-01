import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { AuthDto } from 'src/dto/auth.dto';
import { Account } from 'src/entity/account/account.model';
import { Answer } from 'src/entity/answer/answer.model';
import { AnswerService } from 'src/entity/answer/answer.service';
import { DataTypes } from 'src/entity/data_types/data_types.model';
import { DataTypesService } from 'src/entity/data_types/data_types.service';
import { Direction } from 'src/entity/direction/direction.model';
import { PlaceData } from 'src/entity/place_data/place_data.model';
import { PlaceDataService } from 'src/entity/place_data/place_data.service';
import { PlaceType } from 'src/entity/place_type/place_type.model';
import { ProgrammService } from 'src/entity/programm/programm.service';
import { ProgrammData } from 'src/entity/programm_data/programm_data.model';
import { ProgrammDataService } from 'src/entity/programm_data/programm_data.service';
import { TaskService } from 'src/entity/task/task.service';
import { addAnswerDto } from './dto/add-answer.dto';

export interface addedData {
  value: number;
  data_type_id: number;
  entity_id: number;
  entity_type: 'place' | 'programm';
}

interface validationArrayArguments {
  array: any[];
  key: string;
  message: string;
  exemple: any[];
}

@Injectable()
export class ClientService {
  constructor(
    private taskService: TaskService,
    private answerService: AnswerService,
    private placeDataService: PlaceDataService,
    private programmDataService: ProgrammDataService,
    private dataTypesService: DataTypesService,
    private programmService: ProgrammService,
  ) {}

  async getTasks(user: AuthDto) {
    const tasks = await this.taskService.getAll({
      attributes: ['id', 'half_year', 'year', 'createdAt'],
      include: { model: Account, attributes: ['FIO'] },
    });

    return Promise.all(
      tasks.map(async (task) => {
        const answer = await this.answerService.getOne({
          where: { account_id: user.id, task_id: task.id },
        });

        return { ...task.toJSON(), done: !!answer };
      }),
    );
  }

  async getPlaceTask(id: Number, user: AuthDto) {
    const isValid = await Promise.all(
      user.places.map((place) =>
        this.placeDataService.getOne({
          include: { model: Answer, where: { task_id: id } },
          where: { place_id: place.id },
          attributes: ['id'],
        }),
      ),
    );

    const validPlaces = await Promise.all(
      user.places
        .filter((_, index) => {
          return !isValid[index];
        })
        .map(async (place) => ({
          ...place,
          programms: await this.programmService.getAll({
            attributes: ['id', 'name', 'start_age', 'end_age', 'navigator_id'],
            where: { place_id: place.id },
            include: [{ model: Direction, attributes: ['id', 'name'] }],
          }),
        })),
    );

    return validPlaces;
  }

  async getAnswerData(id: Number, user: AuthDto) {
    const places = this.getPlaceTask(id, user);
  }

  async addAnswer(dto: addAnswerDto, user: AuthDto) {
    const places = await this.getPlaceTask(dto.task_id, user); //? Получение необходимых для отчёта мест
    if (!places)
      throw new HttpException(
        'Пользователь не имеет Мест для Ответа на Задание',
        HttpStatus.BAD_REQUEST,
      );
    this.validationArray({
      array: dto.answer,
      key: 'place_id',
      message:
        'Количество Мест для отчёта не соответсвует необходимому (обратите внимание на повторения)',
      exemple: places,
    });
    const { placeData, programmData, schoolData } =
      await this.getRequiredDataTypes();
    const addedData: addedData[] = [];
    dto.answer.forEach((answer) => {
      const place = places.find((pl) => pl.id === answer.place_id);
      if (!place)
        throw new HttpException(
          'Обнаружен Ответ на Место, которого нет в списке необходимых',
          HttpStatus.BAD_REQUEST,
        );
      const { place_type, programms } = place;
      console.log(programms);
      const typeData = place_type.name === 'Район' ? placeData : schoolData;
      this.validationArray({
        array: answer.place_data,
        key: 'code_name',
        message:
          'Обнаружены не все обязательные типы данных (обратите внимание на повторения)',
        exemple: typeData,
      });
      this.validationArray({
        array: answer.programm_data,
        key: 'programm_id',
        message:
          'Обнаружены не все обязательные программы (обратите внимание на повторения)',
        exemple: programms,
      });
      answer.place_data.forEach((data) => {
        const type = typeData.find((t) => t.code_name === data.code_name);
        if (!type)
          throw new HttpException(
            'Обнаружен ошибка: лишний типа данных в данных о Месте',
            HttpStatus.BAD_REQUEST,
          );
        addedData.push({
          data_type_id: type.id,
          entity_id: answer.place_id,
          entity_type: 'place',
          value: data.value,
        });
      });
      answer.programm_data.forEach((data) => {
        const programm = programms.find((p: any) => {
          return p.id === data.programm_id;
        });
        if (!programm)
          throw new HttpException(
            'Обнаружен ошибка: лишний типа данных в данных о Программе',
            HttpStatus.BAD_REQUEST,
          );
        addedData.push({
          data_type_id: programmData[0].id,
          entity_id: data.programm_id,
          entity_type: 'programm',
          value: data.value,
        });
      });
    });
    const answer = await this.answerService.create({
      account_id: user.id,
      task_id: dto.task_id,
    });
    addedData.forEach(async (add) => {
      if (add.entity_type === 'place') {
        await this.placeDataService.create({
          value: add.value,
          answer_id: answer.id,
          data_type_id: add.data_type_id,
          place_id: add.entity_id,
        });
      } else {
        await this.programmDataService.create({
          value: add.value,
          answer_id: answer.id,
          data_type_id: add.data_type_id,
          programm_id: add.entity_id,
        });
      }
    });
    return addedData;
  }

  getCodeNameOject(data: DataTypes[]) {
    const result = {};
    data.forEach(
      (el) => (result[el.code_name] = { id: el.id, isAdded: false }),
    );
    return result;
  }

  validationArray({ array, key, message, exemple }: validationArrayArguments) {
    const unique = new Set(array.map((el) => el[key]));

    const condition =
      exemple.length === 0
        ? unique.size != array.length
        : unique.size != array.length || unique.size != exemple.length;

    if (condition) throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  async getRequiredDataTypes() {
    //! Обязательные типы данных для мест
    const placeData = await this.dataTypesService.getAll({
      include: { model: PlaceType, where: { name: 'Район' }, attributes: [] },
      attributes: ['id', 'code_name'],
    });

    const schoolData = await this.dataTypesService.getAll({
      where: { code_name: { [Op.ne]: 't7_2' } },
      include: {
        model: PlaceType,
        where: { name: 'Учреждение' },
        attributes: [],
      },
      attributes: ['id', 'code_name'],
    });
    const programmData = await this.dataTypesService.getAll({
      where: { code_name: 't7_2' },
      attributes: ['id', 'code_name'],
    });

    return { placeData, schoolData, programmData };
  }
}

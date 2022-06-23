import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { Place } from '../place/place.model';
import { PlaceService } from '../place/place.service';
import { Role } from '../role/role.model';
import { Control } from './control.model';
import { addControlDto } from './dto/add-control.dto';

@Injectable()
export class ControlService {
  constructor(
    @InjectModel(Control) private controlRepository: typeof Control,
    private accountService: AccountService,
    private placeService: PlaceService,
  ) {}

  accountHasPlace(account: Account, place: Place) {
    if (
      account.places.findIndex((r) => {
        return r.id === place.id;
      }) > -1
    )
      throw new HttpException(
        'Такое место у аккаунта уже имеется',
        HttpStatus.BAD_REQUEST,
      );
  }

  async add(dto: addControlDto) {
    const account = await this.accountService.getById({
      id: dto.account_id,
      include: Place,
    });
    const place = await this.placeService.getById(dto.place_id);

    this.accountHasPlace(account, place);

    const control = await this.controlRepository.create(dto);

    return { id: control.id };
  }

  async remove(dto: addControlDto) {
    const account = await this.accountService.getById({
      id: dto.account_id,
      include: Place,
    });

    const place = await this.placeService.getById(dto.place_id);

    const permission = await this.getByAccountAndPlace(account.id, place.id);

    permission.destroy();
  }

  async getById(id: number) {
    const control = await this.controlRepository.findByPk(id);
    if (!control)
      throw new HttpException(
        'Управления с таким ID не найдено',
        HttpStatus.BAD_REQUEST,
      );
    return control;
  }

  async getByAccountAndPlace(account_id: number, place_id: number) {
    const control = await this.controlRepository.findOne({
      where: { account_id, place_id },
    });
    if (!control)
      throw new HttpException(
        'Аккаунт не имеет такое место',
        HttpStatus.BAD_REQUEST,
      );
    return control;
  }
}

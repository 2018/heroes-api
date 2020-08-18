import {Inject, Injectable} from '@nestjs/common';
import {Model, UpdateQuery} from 'mongoose';
import * as _ from 'lodash';
import {HERO_MODEL} from '../app.constants';
import {IHero} from './interfaces/hero.interface';
import {CreateHeroDto} from './dto/create-hero.dto';
import {IErrorMessage} from '../common/error-message.interface';

@Injectable()
export class HeroesService {
    constructor(@Inject(HERO_MODEL) private heroModel: Model<IHero>) {}

    async create(createHeroDto: CreateHeroDto): Promise< IHero | IErrorMessage> {
        try {
            const createdHero = new this.heroModel(createHeroDto);
            return createdHero.save().then((res) => this.formatItem(res));
        } catch (e) {
            return {message: e}
        }
    }

    async findAll(args?: string): Promise<IHero[] | IErrorMessage> {
        try {
            return this.heroModel.find().limit(+args)
                .map((res) => this.format(res)).exec();
        } catch (e) {
            return {message: e}
        }
    }

    async findOne(id: string): Promise<IHero | IErrorMessage> {
        try {
            return this.heroModel.findById(id)
                .map((res) => this.formatItem(res)).exec();
        } catch (e) {
            return {message: e}
        }
    }

    async update(id: string, updateHeroDto: UpdateQuery<IHero>): Promise<IHero | IErrorMessage> {
        try {
            return this.heroModel.findByIdAndUpdate(id, updateHeroDto).exec().then(() => {
                return this.findOne(id);
            });
        } catch (e) {
            return {message: e}
        }
    }

    async remove(id: string): Promise<IHero | IErrorMessage> {
        try {
            return this.heroModel.findByIdAndRemove(id).exec().then((res) => this.formatItem(res));
        } catch (e) {
            return {message: e}
        }
    }

    private format(val: IHero[]) {
        return _.map(val, (item: IHero) => {
            return this.formatItem(item);
        });
    }

    private formatItem(val: IHero|null): IHero|null {
        return val !== null ? <IHero>{
            id: val._id,
            name: val.name,
            create_date: val.create_date
        } : null;
    }

    private handleResponse(res:any) {
        return {
            updated: _.get(res, 'lastErrorObject.updatedExisting')
        };
    }
}

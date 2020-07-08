import {Inject, Injectable} from '@nestjs/common';
import {Model, UpdateQuery} from 'mongoose';
import * as _ from 'lodash';
import {HERO_MODEL} from '../app.constants';
import {HeroInterface} from './interfaces/hero.interface';
import {CreateHeroDto} from './dto/create-hero.dto';
import {HeroesArgs} from './dto/heroes.args';

@Injectable()
export class HeroesService {
    constructor(@Inject(HERO_MODEL) private heroModel: Model<HeroInterface>) {}

    async create(createHeroDto: CreateHeroDto): Promise<HeroInterface> {
        const createdHero = new this.heroModel(createHeroDto);
        return createdHero.save().then((res) => this.formatItem(res));
    }

    async findAll(args?: HeroesArgs): Promise<HeroInterface[]> {
        return this.heroModel.find().where(args)
            .map((res) => this.format(res)).exec();
    }

    async findOne(id: string): Promise<HeroInterface|null> {
        return this.heroModel.findById(id)
            .map((res) => this.formatItem(res)).exec();
    }

    async update(id: string, updateHeroDto: UpdateQuery<HeroInterface>) {
        return this.heroModel.findByIdAndUpdate(id, updateHeroDto)
            .map((res) => this.handleResponse(res)).exec();
    }

    async remove(id: string): Promise<HeroInterface> {
        return this.heroModel.findByIdAndRemove(id).exec();
    }

    private format(val: HeroInterface[]) {
        return _.map(val, (item: HeroInterface) => {
            return this.formatItem(item);
        });
    }

    private formatItem(val: HeroInterface|null): HeroInterface|null {
        return val !== null ? <HeroInterface>{
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

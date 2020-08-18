import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {HeroesService} from '../heroes.service';
import {CreateHeroDto} from '../dto/create-hero.dto';
import {UpdateHeroDto} from '../dto/update-hero.dto';
import {FindOneParams} from '../dto/find-one.dto';

@Controller('heroes')
export class HeroController {
    constructor(private heroService: HeroesService) {}

    @Post()
    create(@Body() createHeroDto: CreateHeroDto) {
        return this.heroService.create(createHeroDto);
    }

    @Get()
    findAll(@Query('limit') param?: string) {
        return this.heroService.findAll(param);
    }

    @Get(':id')
    findOne(@Param() param: FindOneParams) {
        return this.heroService.findOne(param.id);
    }

    @Put(':id')
    update(@Param() params: FindOneParams, @Body() updateHeroDto: UpdateHeroDto) {
        return this.heroService.update(params.id, updateHeroDto);
    }

    @Delete(':id')
    remove(@Param() params: FindOneParams) {
        return this.heroService.remove(params.id);
    }
}

import {Test, TestingModule} from '@nestjs/testing';
import {HeroController} from './hero.controller';
import {HeroesService} from '../heroes.service';

describe('HeroController', () => {
    let appController: HeroController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [HeroController],
            providers: [HeroesService],
        }).compile();

        appController = app.get<HeroController>(HeroController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.findAll()).toEqual([]);
        });
    });
});

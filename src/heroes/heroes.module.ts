import {Module} from '@nestjs/common';
import {HeroController} from './controllers/hero.controller';
import {HeroesService} from './heroes.service';
import {DatabaseModule} from '../database/database.module';
import {heroesProviders} from './heroes.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [HeroController],
    providers: [
        HeroesService,
        ...heroesProviders
    ],
})
export class HeroesModule {
}

import { Connection } from 'mongoose';
import {HeroSchema} from './schemas/hero.schema';
import {
    DATABASE_TABLE,
    DATABASE_CONNECTION,
    HERO_MODEL
} from '../app.constants';

export const heroesProviders = [
    {
        provide: HERO_MODEL,
        useFactory: (connection: Connection) => connection.model(DATABASE_TABLE, HeroSchema),
        inject: [DATABASE_CONNECTION],
    },
];
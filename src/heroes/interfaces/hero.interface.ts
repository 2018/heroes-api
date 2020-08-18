import { Document } from 'mongoose';

export interface IHero extends Document {
    readonly id: string;
    readonly name: string;
    readonly create_date: Date;
}
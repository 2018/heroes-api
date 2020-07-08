import { Document } from 'mongoose';

export interface HeroInterface extends Document {
    readonly id: string;
    readonly name: string;
    readonly create_date: Date;
}
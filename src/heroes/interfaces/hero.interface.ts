import { Document } from 'mongoose';

export interface IHero extends Document {
    readonly id: string;
    readonly name: string;
    readonly full_name: string;
    readonly thumb: string;
    readonly photo: string;
    readonly description: string;
    readonly text: string;
}

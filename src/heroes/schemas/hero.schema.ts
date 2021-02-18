import * as mongoose from 'mongoose';

export const HeroSchema = new mongoose.Schema({
    name: String,
    full_name: String,
    thumb: String,
    photo: String,
    description: String,
    text: String
});

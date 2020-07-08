import * as mongoose from 'mongoose';

export const HeroSchema = new mongoose.Schema({
    name: String,
    create_date: Date,
});
import {Length, IsNotEmpty} from 'class-validator';

export class CreateHeroDto {
    @IsNotEmpty()
    @Length(3, 100)
    readonly name: string;
}
import {IsNotEmpty, MaxLength, MinLength} from 'class-validator';

export class UpdateHeroDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    full_name: string;

    @IsNotEmpty()
    thumb: string;

    @IsNotEmpty()
    photo: string;

    @IsNotEmpty()
    description: string;

    text: string;
}

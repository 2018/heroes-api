import {Length, IsNotEmpty} from 'class-validator';

export class CreateHeroDto {
    @IsNotEmpty()
    @Length(3, 100)
    readonly name: string;

    @IsNotEmpty()
    @Length(3, 100)
    readonly full_name: string;

    @IsNotEmpty()
    readonly thumb: string;

    @IsNotEmpty()
    readonly photo: string;

    @IsNotEmpty()
    readonly description: string;

    readonly text: string;
}

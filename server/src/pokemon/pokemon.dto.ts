import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PokemonDto {

    @ApiProperty()
    readonly id?: number;

    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNumber()
    readonly damage: number;

    @ApiProperty({ default: false })
    @IsBoolean()
    readonly captured: boolean;
}

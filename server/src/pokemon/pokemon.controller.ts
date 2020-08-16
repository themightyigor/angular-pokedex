import { Controller, Get, Body, Post, Param, Put, Delete, Patch, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonDto } from './pokemon.dto';
import { ApiTags } from '@nestjs/swagger';
import { PokemonEntity } from 'src/entities/pokemon.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Pokemon')
@Controller('pokemons')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    findAll(): Promise<PokemonEntity[]> {
        return this.pokemonService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() PokemonDto: PokemonDto) {
        return this.pokemonService.create(PokemonDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id') id: number) {
        return this.pokemonService.delete(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: number, @Body() PokemonDto: PokemonDto) {
        return this.pokemonService.update(PokemonDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<PokemonEntity> {
        return this.pokemonService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    toggleStatus(@Param('id') id: number): Promise<PokemonEntity> {
        return this.pokemonService.toggleStatus(id);
    }
}

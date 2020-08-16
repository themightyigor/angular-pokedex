import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonDto } from './pokemon.dto';
import { PokemonEntity } from 'src/entities/pokemon.entity';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(PokemonEntity)
        private readonly pokemonRepository: Repository<PokemonEntity>,
    ) { }

    async findAll(): Promise<PokemonEntity[]> {
        return this.pokemonRepository.find();
    }

    async create(pokemonDto: PokemonDto) {
        return await this.pokemonRepository.save(pokemonDto);
    }

    async delete(id: number) {
        return await this.pokemonRepository.delete(id);
    }

    async update(pokemonDto: PokemonDto) {
        await this.pokemonRepository.update(pokemonDto.id, pokemonDto);
        return await this.pokemonRepository.findOne(pokemonDto.id);
    }

    async findOne(id: number): Promise<PokemonEntity> {
        return await this.pokemonRepository.findOne(id);
    }

    async toggleStatus(id: number): Promise<PokemonEntity> {
        const pokemonEntity = await this.findOne(id);
        const updateEntity = {
            ...pokemonEntity,
            captured: !pokemonEntity.captured,
            updatedAt: new Date(),
          };

        return await this.pokemonRepository.save(updateEntity);
    }
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity('pokemon')
export class PokemonEntity extends AbstractEntity {

    @Column('text')
    name: string;

    @Column('int')
    damage: number;

    @Column({ type: 'bool', default: false })
    captured: boolean;
}

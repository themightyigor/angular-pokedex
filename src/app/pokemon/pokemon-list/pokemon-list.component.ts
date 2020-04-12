import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor() {}

  ngOnInit() {}
}
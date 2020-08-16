import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import * as PokemonActions from 'src/app/store/pokemon/pokemon.actions';
import * as PokemonSelectors from 'src/app/store/pokemon/pokemon.selectors';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-edit-dialog',
  templateUrl: './pokemon-edit-dialog.component.html',
  styleUrls: ['./pokemon-edit-dialog.component.scss'],
})
export class PokemonEditDialogComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required]],
    damage: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1), Validators.max(100)]],
    createdAt: ['', [Validators.required]],
  });
  loading$ = this.store.pipe(select(PokemonSelectors.getLoading));
  pokemon: Pokemon;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: { pokemon: Pokemon }
  ) {
    this.pokemon = this.data.pokemon;
  }

  ngOnInit() {
    const { name, damage, createdAt } = this.pokemon;
    this.form.setValue({
      name,
      damage,
      createdAt,
    });
  }

  save() {
    const name = this.form.get('name')?.value as string;
    const damage = this.form.get('damage')?.value as number;
    const createdAt = this.form.get('createdAt')?.value as Date;

    const pokemon = {
      ...this.pokemon,
      name,
      damage,
      createdAt,
    };
    this.store.dispatch(PokemonActions.updatePokemon({ pokemon }));
  }
}

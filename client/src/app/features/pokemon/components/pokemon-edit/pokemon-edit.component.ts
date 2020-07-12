import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as PokemonActions from 'src/app/store/pokemon/pokemon.actions';
import * as PokemonSelectors from 'src/app/store/pokemon/pokemon.selectors';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.scss'],
})
export class PokemonEditComponent implements OnInit, OnDestroy {
  pokemon$ = this.store.pipe(select(PokemonSelectors.getPokemon));

  public form: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.initForm();
      this.store.dispatch(PokemonActions.loadPokemon({ id }));
      this.subscription.add(this.subscribeToPokemon());
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      damage: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1), Validators.max(100)]],
      createdAt: ['', [Validators.required]],
    });
  }

  subscribeToPokemon(): Subscription {
    return this.pokemon$.pipe(filter((pokemon) => !!pokemon)).subscribe((pokemon) => {
      const { name, damage, createdAt } = pokemon;
      this.form.setValue({
        name,
        damage,
        createdAt: formatDate(createdAt, 'yyyy-MM-dd', 'en'),
      });
    });
  }

  onSubmit(id: string): void {
    const updatedPokemon = {
      _id: id,
      ...this.form.value,
    };

    this.store.dispatch(PokemonActions.updatePokemon({ updatedPokemon }));
  }

  onCancel(id: string): void {
    this.router.navigate(['pokemons', id]);
  }
}

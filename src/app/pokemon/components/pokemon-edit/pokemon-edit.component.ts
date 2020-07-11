import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Pokemon } from '../../../models/pokemon.model';
import { getPokemon, updatePokemon } from '../../../store/pokemon/pokemon.actions';
import { selectPokemon } from '../../../store/pokemon/pokemon.selectors';
import { State } from '../../../store';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.scss'],
})
export class PokemonEditComponent implements OnInit {
  public pokemon$: Observable<Pokemon>;
  public editPokemonForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<State>
  ) {
    this.pokemon$ = this.store.pipe(select(selectPokemon));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.initForm();
      this.getPokemon(id);
    });
  }

  initForm(): void {
    this.editPokemonForm = this.fb.group({
      name: [null, [Validators.required]],
      damage: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1), Validators.max(100)]],
      createdAt: [null, [Validators.required]],
    });
  }

  getPokemon(id: number): void {
    this.store.dispatch(getPokemon({ id }));
    this.pokemon$.subscribe((pokemon) => {
      const { name, damage, createdAt } = pokemon;
      this.editPokemonForm.setValue({
        name,
        damage,
        createdAt: formatDate(createdAt, 'yyyy-MM-dd', 'en'),
      });
    });
  }

  onSubmit(id: number): void {
    const { value } = this.editPokemonForm;
    const createdAt = new Date(value.createdAt).toISOString();
    const updatedPokemon = { ...value, createdAt };
    this.store.dispatch(updatePokemon({ id, updatedPokemon }));
  }

  onCancel(id: number): void {
    this.router.navigate(['pokemon', id]);
  }

  canDeactivate(): boolean {
    return confirm('Are you sure you want to quit edit mode?');
  }
}

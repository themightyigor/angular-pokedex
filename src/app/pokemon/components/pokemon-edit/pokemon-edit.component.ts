import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

import { PokemonService } from '../../services/pokemon.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.scss'],
})
export class PokemonEditComponent implements OnInit {
  public pokemonId: number;
  public editPokemonForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.initForm();
      this.getPokemon(id);
    });
  }

  initForm() {
    this.editPokemonForm = this.fb.group({
      name: ['', [Validators.required]],
      damage: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1), Validators.max(100)]],
      createdAt: ['', [Validators.required]],
    });
  }

  getPokemon(id: number): void {
    this.pokemonService.getPokemonById(id).subscribe((pokemon) => {
      this.pokemonId = pokemon.id;
      this.editPokemonForm.setValue({
        name: pokemon.name,
        damage: pokemon.damage,
        createdAt: formatDate(pokemon.createdAt, 'yyyy-MM-dd', 'en'),
      });
    });
  }

  onSubmit(): void {
    const createdAt = Date.parse(this.editPokemonForm.value.createdAt);
    const updatedPokemon = { ...this.editPokemonForm.value, createdAt };
    this.pokemonService.updatePokemon(this.pokemonId, updatedPokemon);
    this.notifierService.notify('success', 'Success!');
    this.goToPokemonPage();
  }

  goToPokemonPage(): void {
    this.router.navigate(['pokemon', this.pokemonId]);
  }

  canDeactivate(): boolean {
    return confirm('Are you sure you want to quit edit mode?');
  }
}

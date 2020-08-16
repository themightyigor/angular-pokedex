import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PokemonsComponent } from './pokemons.component';
import { loadPokemonsSuccess } from 'src/app/store/pokemon/pokemon.actions';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonStoreModule } from 'src/app/features/pokemon/pokemon-store.module';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let store: Store;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  const mockDate = new Date();

  const mockPokemons: Pokemon[] = [
    { name: 'bulbasaur', id: '1', damage: 36, captured: false, createdAt: mockDate, updatedAt: mockDate },
    {
      name: 'ivysaur',
      id: '2',
      damage: 46,
      captured: false,
      createdAt: mockDate,
      updatedAt: mockDate,
    },
    {
      name: 'venusaur',
      id: '3',
      damage: 10,
      captured: false,
      createdAt: mockDate,
      updatedAt: mockDate,
    },
  ];

  const getPokemonCards = () => fixture.debugElement.query(By.css('.pokemon-cards'));
  const getPokemonList = () => fixture.debugElement.query(By.css('.pokemon-list'));
  const getChangeViewButton = () => fixture.debugElement.query(By.css('.pokemons__button'));
  const getPokemonCard = () => fixture.debugElement.queryAll(By.css('app-pokemon-card'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonsComponent],
      imports: [
        RouterTestingModule,
        RouterModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        PokemonStoreModule,
      ],
      providers: [{ provide: 'API_URL', useValue: '123' }],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    store.dispatch(loadPokemonsSuccess({ pokemons: mockPokemons }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pokemon cards on initial load', () => {
    expect(getPokemonCards().nativeElement).toBeTruthy();
  });

  it('should display pokemon list after changing view mode', () => {
    getChangeViewButton().nativeElement.click();
    fixture.detectChanges();

    expect(getPokemonList().nativeElement).toBeTruthy();
  });

  it('should display pokemon cards according to the store data', async(() => {
    expect(getPokemonCard().length).toBe(mockPokemons.length);
  }));
});

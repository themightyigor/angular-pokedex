import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEditDialogComponent } from './pokemon-edit-dialog.component';

describe('PokemonEditDialogComponent', () => {
  let component: PokemonEditDialogComponent;
  let fixture: ComponentFixture<PokemonEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

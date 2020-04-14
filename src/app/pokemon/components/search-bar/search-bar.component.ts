import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter();

  pokemonName: string;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.search.emit(this.pokemonName);
  }
}

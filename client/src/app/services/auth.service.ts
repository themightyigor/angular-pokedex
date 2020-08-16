import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import * as UserActions from '../store/user/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api: string = environment.apiUrl + '/auth';

  constructor(private http: HttpClient, private router: Router, private store: Store) {}

  login(user: Partial<User>) {
    return this.http.post<User>(`${this.api}/signIn`, user).pipe(
      mergeMap((user: User) => {
        this.token = user.access_token || '';
        this.router.navigate(['pokemons']);
        return of(user);
      })
    );
  }

  get token() {
    return localStorage.getItem('access_token') || '';
  }

  set token(val: string) {
    if (val.length > 0) {
      localStorage.setItem('access_token', val);
    }
  }

  logout() {
    this.store.dispatch(UserActions.logout());
    localStorage.clear();
  }
}

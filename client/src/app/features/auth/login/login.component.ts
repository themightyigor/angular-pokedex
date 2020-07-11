import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Store, select } from '@ngrx/store';
import * as UserActions from 'src/app/store/user/user.actions';
import * as UserSelectors from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  error$ = this.store.pipe(select(UserSelectors.getError));
  authorized$ = this.store.pipe(select(UserSelectors.getLogin));

  constructor(private fb: FormBuilder, private store: Store) {}

  async ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        const name: string = this.form.get('name')?.value;
        const password: string = this.form.get('password')?.value;
        const user: Partial<User> = {
          name,
          password,
        };
        this.store.dispatch(UserActions.login({ user }));
      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }
}

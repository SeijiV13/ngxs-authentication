import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/modules/login/states/stores/login.state';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<any> {
    return this.store.select(AuthState.token);
  }

}

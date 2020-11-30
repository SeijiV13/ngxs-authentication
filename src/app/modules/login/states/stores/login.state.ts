import { Login, Logout } from './../actions/login.actions';
import { LoginService } from './../../../../core/services/login.service';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class AuthStateModel {
  token: string;
  username: string;
}



@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null
  }
})
export class AuthState {

  @Selector()
  // tslint:disable-next-line: typedef
  static token(state: AuthStateModel) { return state.token; }

  constructor(private loginService: LoginService) {}

  @Action(Login)
  // tslint:disable-next-line: typedef
  login({ patchState }: StateContext<AuthStateModel>, { payload }: Login) {
    return this.loginService.login(payload).pipe(tap((result: { token: string }) => {
      patchState({ token: result.token, username: payload.username });
    },
    catchError((err) => {
      return throwError(`Invalid username or password`);
    })
    ));
  }

  @Action(Logout)
  // tslint:disable-next-line: typedef
  logout({ setState, getState }: StateContext<AuthStateModel>) {
    const { token } = getState();
    setState(
      {
        username: null,
        token: null
      }
    );
  }

}

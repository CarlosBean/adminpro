import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser, User } from 'src/app/models/user.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { API_URL } from 'src/app/app.config';
import { map, catchError } from 'rxjs/operators';
import { Account } from 'src/app/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  helper = new JwtHelperService();
  token: string;
  user: IUser;
  private authenticationState = new Subject<any>();

  constructor(public http: HttpClient, public router: Router) {
    this.loadStorage();
  }

  renewToken() {
    const url = API_URL + '/login/newtoken' + '?token=' + this.token;
    return this.http.get(url).pipe(
      map((res: any) => {
        this.saveStorage(res.token);
      }),
      catchError((err: any) => {
        this.logout();
        Swal.fire('Error on Session', 'Token cannot be renewed', 'error');
        return new Observable<any>();
      })
    );
  }

  isLogged() {
    return this.token && this.token.length > 5;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = this.helper.decodeToken(this.token).user;
    }
  }

  saveStorage(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
    this.patchUser(this.helper.decodeToken(token).user);
    this.authenticationState.next(this.user);
  }

  patchUser(data: IUser) {
    this.user = this.user || new User('', '');
    this.user.name = data.name;
    this.user.email = data.email;
    this.user.google = data.google;
    this.user.img = data.img;
    this.user._id = data._id;
    this.user.role = data.role;
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  googleLogin(token: string): Observable<any> {
    const url = API_URL + '/login/google';
    return this.http.post(url, { token }).pipe(map((res: any) => {
      this.saveStorage(res.data.token);
      return true;
    }));
  }

  login(account: Account) {
    account.rememberMe ?
      localStorage.setItem('email', account.email) : localStorage.removeItem('email');

    const url = API_URL + '/login';
    return this.http.post(url, account).pipe(
      map((res: any) => {
        this.saveStorage(res.data.token);
        return true;
      })
    );
  }

  hasAnyAuthority(authorities: string[]): boolean {
    return this.user && this.user.role ?
      authorities.includes(this.user.role) : false;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }
}

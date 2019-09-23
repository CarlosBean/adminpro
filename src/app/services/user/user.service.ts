import { Injectable } from '@angular/core';
import { User, IUser } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.config';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Account } from 'src/app/models/account.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  helper = new JwtHelperService();
  urlResource = `${API_URL}/user`;
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
      }),
      catchError((err: any) => {
        Swal.fire('Error on Login', err.error.message, 'error');
        return new Observable<any>();
      })
    );
  }

  hasAnyAuthority(authorities: string[]): boolean {
    return !this.user || !this.user.role ? false : authorities.includes(this.user.role);
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  create(user: User): Observable<any> {
    return this.http.post(this.urlResource, user).pipe(
      map((res: any) => {
        Swal.fire(res.message, res.data.email, 'success');
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        Swal.fire(err.error.message, err.error.errors.message, 'error');
        return new Observable<any>();
      })
    );
  }

  update(user: User) {
    const url = `${this.urlResource}/${user._id}?token=${this.token}`;
    return this.http.put(url, user).pipe(map((res: any) => {
      if (user._id === this.user._id) {
        this.saveStorage(res.data.token);
      }
      Swal.fire(res.message, 'Your user has been updated successfully', 'success');
      return res;
    }));
  }

  getAll(from = 0) {
    const url = `${this.urlResource}?from=${from}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  searchAll(text: string) {
    const url = `${API_URL}/search/collection/users/${text}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  delete(id: string): Observable<any> {
    const url = `${this.urlResource}/${id}?token=${this.token}`;
    return this.http.delete(url).pipe(map((res: any) => res));
  }
}

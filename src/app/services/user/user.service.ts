import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Account } from 'src/app/models/account.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlResource = `${API_URL}/user`;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.loadStorage();
  }

  isLogged() {
    return this.token && this.token.length > 5;
  }

  loadStorage() {
    this.token = localStorage.getItem('token') || '';
    console.log('initialized token', this.token);
  }

  saveStorage(id: string, token: string) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    this.token = token;
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  googleLogin(token: string): Observable<any> {
    const url = API_URL + '/login/google';
    return this.http.post(url, { token }).pipe(map((res: any) => {
      this.saveStorage(res.data.id, res.data.token);
      return true;
    }));
  }

  login(account: Account) {
    account.rememberMe ?
      localStorage.setItem('email', account.email) : localStorage.removeItem('email');

    const url = API_URL + '/login';
    return this.http.post(url, account).pipe(map((res: any) => {
      this.saveStorage(res.data.id, res.data.token);
      return true;
    }));
  }

  create(user: User): Observable<any> {
    return this.http.post(this.urlResource, user).pipe(map((res: any) => {
      Swal.fire(res.message, res.data.email, 'success');
      return res;
    }));
  }
}

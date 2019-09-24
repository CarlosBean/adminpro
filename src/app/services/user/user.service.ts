import { Injectable } from '@angular/core';
import { User, IUser } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.config';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlResource = `${API_URL}/user`;

  constructor(public http: HttpClient, public router: Router, public accountService: AccountService) {
    this.accountService.loadStorage();
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
    const url = `${this.urlResource}/${user._id}`;
    return this.http.put(url, user).pipe(map((res: any) => {
      if (user._id === this.accountService.user._id) {
        this.accountService.saveStorage(res.data.token);
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
    const url = `${this.urlResource}/${id}`;
    return this.http.delete(url).pipe(map((res: any) => res));
  }
}

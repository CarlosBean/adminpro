import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { IDoctor } from 'src/app/models/doctor.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  urlResource = `${API_URL}/doctor`;

  constructor(public http: HttpClient, public userService: UserService) { }

  getAll(from = 0): Observable<any> {
    const url = `${this.urlResource}?from=${from}`;
    return this.http.get(url).pipe(map(res => res));
  }

  getById(id: string) {
    const url = `${this.urlResource}/${id}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  create(doctor: IDoctor): Observable<any> {
    const url = `${this.urlResource}?token=${this.userService.token}`;
    return this.http.post(url, doctor).pipe(map((res: any) => {
      Swal.fire(res.message, res.data.email, 'success');
      return res;
    }));
  }

  update(doctor: IDoctor) {
    const url = `${this.urlResource}/${doctor._id}?token=${this.userService.token}`;
    return this.http.put(url, doctor).pipe(map((res: any) => {
      Swal.fire(res.message, 'Doctor has been updated successfully', 'success');
      return res;
    }));
  }

  searchAll(text: string) {
    const url = `${API_URL}/search/collection/doctors/${text}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  delete(id: string): Observable<any> {
    const url = `${this.urlResource}/${id}?token=${this.userService.token}`;
    return this.http.delete(url).pipe(map((res: any) => res));
  }
}

import { Injectable } from '@angular/core';
import { IHospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  urlResource = `${API_URL}/hospital`;

  constructor(public http: HttpClient) { }

  create(hospital: IHospital): Observable<any> {
    return this.http.post(this.urlResource, hospital).pipe(map((res: any) => {
      Swal.fire(res.message, res.data.email, 'success');
      return res;
    }));
  }

  update(hospital: IHospital) {
    const url = `${this.urlResource}/${hospital._id}`;
    return this.http.put(url, hospital).pipe(map((res: any) => {
      Swal.fire(res.message, 'Hospital has been updated successfully', 'success');
      return res;
    }));
  }

  getAll(from = 0) {
    const url = `${this.urlResource}?from=${from}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  getById(id: string) {
    const url = `${this.urlResource}/${id}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  searchAll(text: string) {
    const url = `${API_URL}/search/collection/hospitals/${text}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  delete(id: string): Observable<any> {
    const url = `${this.urlResource}/${id}`;
    return this.http.delete(url).pipe(map((res: any) => res));
  }
}

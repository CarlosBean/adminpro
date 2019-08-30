import { Injectable } from '@angular/core';
import { API_URL } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(public http: HttpClient) { }

  uploadFile(file: File, collection: string, id: string): Observable<any> {
    const url = `${API_URL}/upload/${collection}/${id}`;
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.put(url, formData, { reportProgress: true })
      .pipe(map((res: any) => res));
  }
}

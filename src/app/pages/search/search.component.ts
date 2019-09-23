import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_URL } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/models/user.model';
import { IHospital } from 'src/app/models/hospital.model';
import { IDoctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: IUser[] = [];
  hospitals: IHospital[] = [];
  doctors: IDoctor[] = [];

  constructor(public route: ActivatedRoute, public http: HttpClient) {
    route.params.subscribe(params => {
      const text = params.text;
      this.search(text);
    });
  }

  ngOnInit() {
  }

  search(text: string) {
    const url = API_URL + '/search/all/' + text;
    this.http.get(url).subscribe((res: any) => {
      this.users = res.data.users;
      this.hospitals = res.data.hospitals;
      this.doctors = res.data.doctors;
    });
  }

}

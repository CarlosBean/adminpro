import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services';
import { IDoctor } from 'src/app/models/doctor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors: IDoctor[] = [];
  totalDoctors: number;
  from = 0;
  loading: boolean;

  constructor(public doctorService: DoctorService) { }

  ngOnInit() {
    this.getDoctors();
  }

  searchDoctor(text: string) {

    if (text.length <= 0) { this.getDoctors(); return; }

    this.doctorService.searchAll(text).subscribe(res => {
      console.log(res);
      this.doctors = res.data.doctors;
    });
  }

  getDoctors() {
    this.doctorService.getAll(this.from).subscribe(res => {
      this.doctors = res.data;
      this.totalDoctors = res.total;
    });
  }

  paginate(value: number) {
    const sum = this.from + value;
    if (sum >= this.totalDoctors || sum < 0) {
      return;
    }

    this.from += value;
    this.getDoctors();
  }

  deleteDoctor(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.doctorService.delete(id).subscribe(res => {
          this.getDoctors();
          Swal.fire('Deleted!', res.message, 'success');
        });
      }
    });
  }


}

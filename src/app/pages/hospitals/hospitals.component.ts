import { Component, OnInit } from '@angular/core';
import { IHospital, Hospital } from 'src/app/models/hospital.model';
import { HospitalService, ModalUploadService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: IHospital[] = [];
  totalHospitals: number;
  from = 0;
  loading: boolean;

  constructor(private hospitalService: HospitalService, public modalService: ModalUploadService) { }

  ngOnInit() {
    this.getHospitals();
    this.modalService.notification.subscribe(res => this.getHospitals());
  }

  openModal(id: string, imgPath: string) {
    this.modalService.openModal('hospitals', id, imgPath);
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService.getAll(this.from).subscribe(res => {
      this.loading = false;
      this.hospitals = res.data;
      this.totalHospitals = res.total;
    });
  }

  paginate(value: number) {
    const sum = this.from + value;
    if (sum >= this.totalHospitals || sum < 0) {
      return;
    }

    this.from += value;
    this.getHospitals();
  }

  searchHospital(text: string) {
    if (text.length <= 0) {
      this.getHospitals();
      return;
    }

    this.loading = true;
    this.hospitalService.searchAll(text).subscribe(res => {
      this.loading = false;
      this.hospitals = res.data.hospitals;
    });
  }

  deleteHospital(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.hospitalService.delete(id).subscribe(res => {
          this.getHospitals();
          Swal.fire('Deleted!', res.message, 'success');
        });
      }
    });
  }

  updateHospital(hospital: IHospital) {
    this.hospitalService.update(hospital).subscribe();
  }

  openSaveModal() {
    Swal.fire({
      title: `Enter hospital's name`,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.value) {
        const hospital = new Hospital(result.value);
        this.hospitalService.create(hospital).subscribe(res => {
          this.getHospitals();
          Swal.fire('Save Successful', result.value, 'success');
        });
      }
    });
  }
}

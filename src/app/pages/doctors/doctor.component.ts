import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DoctorService, HospitalService, ModalUploadService } from 'src/app/services';
import { IHospital, Hospital } from 'src/app/models/hospital.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  doctorForm = this.fb.group({
    _id: [''],
    name: ['', [Validators.required]],
    hospital: ['', [Validators.required]]
  });

  hospitals: IHospital[] = [];
  hospital: IHospital = new Hospital('');
  doctorImg: string;

  constructor(
    public fb: FormBuilder,
    public doctorService: DoctorService,
    public hospitalService: HospitalService,
    public router: Router,
    public route: ActivatedRoute,
    public modalService: ModalUploadService
  ) {
    route.params.subscribe(params => {
      const id = params.id;
      if (id !== 'new') { this.getDoctor(id); }
    });
  }

  ngOnInit() {
    this.getHospitals();
    this.modalService.notification.subscribe(res => {
      this.doctorImg = res.data.img;
    });
  }

  save() {
    if (this.doctorForm.invalid) { return; }

    const action = this.doctorForm.get('_id').value ? 'update' : 'create';

    this.doctorService[action](this.doctorForm.value).subscribe(res => {
      this.router.navigate(['/doctor', res.data._id]);
    });
  }

  getDoctor(id: string) {
    this.doctorService.getById(id).subscribe(res => {
      this.doctorImg = res.data.img;
      this.patchForm(res.data);
      this.changeHospital(res.data.hospital._id);
    });
  }

  patchForm(data: any) {
    this.doctorForm.patchValue({
      _id: data._id,
      name: data.name,
      hospital: data.hospital._id
    });
  }

  getHospitals() {
    this.hospitalService.getAll().subscribe(res => {
      this.hospitals = res.data;
    });
  }

  changeHospital(id: string) {
    this.hospitalService.getById(id).subscribe(res => {
      this.hospital = res.data;
    });
  }

  openModal() {
    this.modalService.openModal('doctors', this.doctorForm.get('_id').value, this.doctorImg);
  }
}

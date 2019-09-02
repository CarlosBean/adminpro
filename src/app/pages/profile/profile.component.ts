import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  @ViewChild('file', { static: false }) file: any;

  user: User;
  profileImage: File;
  profileImageUrl: any;
  profileForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(public fb: FormBuilder, public userService: UserService, public fileService: UploadFileService) {
    this.user = this.userService.user;
  }

  ngOnInit() {
    this.patchForm();
  }

  patchForm() {
    this.profileForm.patchValue({
      _id: this.user._id,
      name: this.user.name,
      email: this.user.email
    });

    if (this.user.google) {
      this.profileForm.controls.email.disable();
    }
  }

  update() {
    if (this.profileForm.invalid) { return; }
    this.userService.update(this.profileForm.getRawValue())
      .subscribe((res: any) => {
        console.log(res);
      }, err => console.error(err));
  }

  getImage(image: File) {
    if (!image) { return; }
    this.profileImage = image;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => this.profileImageUrl = reader.result;
  }

  updateImage() {
    this.fileService.uploadFile(this.profileImage, 'users', this.user._id).subscribe(res => {
      console.log(res);
      this.user.img = res.data.img;
    }, err => {
      console.log('error ', err);
    });
  }

}

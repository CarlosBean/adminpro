import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadFileService, ModalUploadService } from 'src/app/services';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: []
})
export class ModalUploadComponent implements OnInit {

  @ViewChild('file', { static: false }) file: ElementRef;

  image: File;
  imageUrl: any;

  constructor(public fileService: UploadFileService, public modalService: ModalUploadService) { }

  ngOnInit() {
  }

  closeModal() {
    this.image = null;
    this.imageUrl = null;
    this.file.nativeElement.value = '';
    this.modalService.closeModal();
  }

  getImage(image: File) {
    if (!image) { return; }
    this.image = image;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => this.imageUrl = reader.result;
  }

  updateImage() {
    this.fileService.uploadFile(this.image, this.modalService.collection, this.modalService.id).subscribe(res => {
      this.modalService.notification.emit(res);
      this.closeModal();
    }, err => {
      console.log('error on upload image', err);
    });
  }

}

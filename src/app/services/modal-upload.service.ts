import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  collection: string;
  id: string;
  hidden = true;
  oldImage: string;

  notification = new EventEmitter<any>();

  constructor() { }

  closeModal() {
    this.hidden = true;
    this.collection = null;
    this.id = null;
  }

  openModal(collection: string, id: string, imagePath: string) {
    this.hidden = false;
    this.collection = collection;
    this.id = id;
    this.oldImage = imagePath;
  }
}

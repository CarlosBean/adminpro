import { Pipe, PipeTransform } from '@angular/core';
import { API_URL } from 'src/app/app.config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, type = 'users'): any {

    const url = API_URL + '/img';
    const allowedTypes = ['users', 'doctors', 'hospitals'];
    const defaultImage = `${url}/users/default`;

    return !image ? defaultImage :
      image.startsWith('https') ? image :
        allowedTypes.includes(type) ? `${url}/${type}/${image}` :
          defaultImage;
  }
}

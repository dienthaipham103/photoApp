import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private photos;
  private url = ['/local-photo', ''];

  constructor(public photoService: PhotoService) {
    this.photos = this.photoService.test_photos;
  }
  
  // getCount(title){
  //   if(title == 'Local Photos'){
  //     return this.photoService.photos.length;
  //   }
  //   else{
  //     return 0;
  //   }
  // }

}

import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-photo',
  templateUrl: './detail-photo.page.html',
  styleUrls: ['./detail-photo.page.scss'],
})
export class DetailPhotoPage implements OnInit {
  loadedPhoto;
  photoId;

  constructor(public photoService: PhotoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap=>
      {
        if(!paramMap.has('photoId')){
          return;
        }

        this.photoId = Number(paramMap.get('photoId'));
        this.loadedPhoto = this.photoService.photos[this.photoId];
      });
  }

  swipeEvent(){
    this.router.navigate(['']);
  }

  onDeletePhoto(){
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete this photo?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: ()=>{
          this.photoService.remove(this.photoId);
          this.router.navigate(['/local-photo']);
        }
      }]
    }).then(alertEl=>{
      alertEl.present();
    })
  }

}

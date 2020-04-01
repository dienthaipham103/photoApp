import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-local-photo',
  templateUrl: './local-photo.page.html',
  styleUrls: ['./local-photo.page.scss'],
})
export class LocalPhotoPage implements OnInit {
  current_status;

  constructor(public photoService: PhotoService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.photoService.loadSaved();
  }

  onAll(selected_status){
    this.current_status = selected_status;
    console.log(this.current_status);
    if(this.current_status == "Delete"){
      this.alertCtrl.create({
        header: 'Are you sure?',
        message: 'Do you really want to delete all local photo?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: ()=>{
            this.photoService.removeAll();
            this.router.navigate(['/home']);
          }
        }]
      }).then(alertEl=>{
        alertEl.present();
      })
      
    }

    // this.router.navigate(['/home']);
  }

}

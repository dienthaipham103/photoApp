import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPhotoPageRoutingModule } from './detail-photo-routing.module';

import { DetailPhotoPage } from './detail-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPhotoPageRoutingModule
  ],
  declarations: [DetailPhotoPage]
})
export class DetailPhotoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalPhotoPageRoutingModule } from './local-photo-routing.module';

import { LocalPhotoPage } from './local-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalPhotoPageRoutingModule
  ],
  declarations: [LocalPhotoPage]
})
export class LocalPhotoPageModule {}

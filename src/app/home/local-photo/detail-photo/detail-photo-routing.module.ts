import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPhotoPage } from './detail-photo.page';

const routes: Routes = [
  {
    path: ':photoId',
    component: DetailPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPhotoPageRoutingModule {}

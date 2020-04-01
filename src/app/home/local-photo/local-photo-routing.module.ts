import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalPhotoPage } from './local-photo.page';

const routes: Routes = [
  {
    path: '',
    component: LocalPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalPhotoPageRoutingModule {}

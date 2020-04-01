import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'local-photo',
    loadChildren: () => import('./home/local-photo/local-photo.module').then( m => m.LocalPhotoPageModule)
  },
  {
    path: 'detail-photo',
    loadChildren: () => import('./home/local-photo/detail-photo/detail-photo.module').then( m => m.DetailPhotoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

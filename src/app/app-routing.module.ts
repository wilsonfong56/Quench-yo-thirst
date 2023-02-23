import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'p1',
    loadChildren: () => import('./pages/p1/p1.module').then( m => m.P1PageModule)
  },
  {
    path: 'p2',
    loadChildren: () => import('./pages/p2/p2.module').then( m => m.P2PageModule)
  },
  {
    path: 'p3',
    loadChildren: () => import('./pages/p3/p3.module').then( m => m.P3PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

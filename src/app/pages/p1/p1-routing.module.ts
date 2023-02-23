import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P1Page } from './p1.page';

const routes: Routes = [
  {
    path: '',
    component: P1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P1PageRoutingModule {}

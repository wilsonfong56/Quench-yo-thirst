import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2Page } from './p2.page';

const routes: Routes = [
  {
    path: '',
    component: P2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2PageRoutingModule {}

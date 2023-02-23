import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P3Page } from './p3.page';

const routes: Routes = [
  {
    path: '',
    component: P3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P3PageRoutingModule {}

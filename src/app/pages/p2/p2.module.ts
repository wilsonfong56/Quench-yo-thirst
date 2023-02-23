import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2PageRoutingModule } from './p2-routing.module';

import { P2Page } from './p2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2PageRoutingModule
  ],
  declarations: [P2Page]
})
export class P2PageModule {}

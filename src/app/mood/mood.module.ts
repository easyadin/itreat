import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoodPageRoutingModule } from './mood-routing.module';

import { MoodPage } from './mood.page';


import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoodPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [MoodPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoodPageModule { }

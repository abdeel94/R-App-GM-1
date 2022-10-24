import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioPageRoutingModule } from './horario-routing.module';

import { HorarioPage } from './horario.page';

import { UserDataComponent } from 'src/app/components/user-data/user-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioPageRoutingModule
  ],
  declarations: [HorarioPage, UserDataComponent]
})
export class HorarioPageModule {}

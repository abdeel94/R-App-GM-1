import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaPageRoutingModule } from './asistencia-routing.module';

import { AsistenciaPage } from './asistencia.page';
import { NgApexchartsModule } from "ng-apexcharts";
import { UserDataComponent } from 'src/app/components/user-data/user-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaPageRoutingModule,
   NgApexchartsModule
  ],
  declarations: [AsistenciaPage, UserDataComponent]
})
export class AsistenciaPageModule {}

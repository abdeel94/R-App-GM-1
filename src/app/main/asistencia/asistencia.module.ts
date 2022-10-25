import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaPageRoutingModule } from './asistencia-routing.module';

import { AsistenciaPage } from './asistencia.page';
import { NgApexchartsModule } from "ng-apexcharts";
import { UserDataComponent } from 'src/app/components/user-data/user-data.component';
import { AgregarComponent } from 'src/app/components/crud/agregar/agregar.component';
import { ModificarComponent } from 'src/app/components/crud/modificar/modificar.component';
import { ListarComponent } from 'src/app/components/crud/listar/listar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaPageRoutingModule,
   NgApexchartsModule,
  ],
  declarations: [AsistenciaPage, UserDataComponent,AgregarComponent,ModificarComponent,ListarComponent],
})
export class AsistenciaPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: 'main',
    component: TabInicialPage,
    children: [
      {
        path: 'qr',
        loadChildren: () => import('./../../main/qr/qr.module').then( m => m.QrPageModule)
      },
      {
        path: 'asistencia',
        loadChildren: () => import('./../../main/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
      },
      {
        path: 'horario',
        loadChildren: () => import('./../../main/horario/horario.module').then( m => m.HorarioPageModule)
      },
      {
        path: '',
        redirectTo: '/main/qr',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'main/qr',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}

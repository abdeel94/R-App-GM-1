import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  
  {
    path: 'tab-inicial',
    loadChildren: () => import('./main/tab-inicial/tab-inicial.module').then( m => m.TabInicialPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./main/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },  {
    path: 'modal-popup',
    loadChildren: () => import('./modal-popup/modal-popup.module').then( m => m.ModalPopupPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

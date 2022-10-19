import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QrPage } from './qr.page';
import { BarcodeScanner }from '@awesome-cordova-plugins/barcode-scanner/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPageRoutingModule,
  ],
  providers:[BarcodeScanner,],
  declarations: [QrPage]
})
export class QrPageModule {}

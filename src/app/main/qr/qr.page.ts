import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  @ViewChild("slidingCard", { read: ElementRef, static: true }) slidingCard: ElementRef;

  constructor(private animationCtrl: AnimationController,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.slideCard();

  }

  public slideCard() {

    const animationA = this.animationCtrl


      .create()
      .addElement(this.slidingCard.nativeElement)
      .duration(750)
      .iterations(1)
      .fromTo('transform', 'translateX(200px)', 'translateX(0px)')
      .fromTo('opacity', '0', '1');
    animationA.play();
  }

  data: any;

  barCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  salir() {
    localStorage.setItem('ingresado','false')
    localStorage.removeItem('ingresado')
    this.router.navigate(['/login'])
  }

}

import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { Asistencia } from 'src/app/clases/asistencia';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  asistencias: Asistencia[];

  @ViewChild("slidingCard", { read: ElementRef, static: true }) slidingCard: ElementRef;

  constructor(private animationCtrl: AnimationController,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private dbservice: DbserviceService,
    
  ) { }

  ngOnInit() {
    this.recuperaridAlumno();
    this.fechaActual = new Date();
    this.fechaActual = this.fechaActual.toLocaleDateString();
  }

  fechaActual: any;
  idAlumno: any;
  // ramo: any;
  jsonData: any;

  //variables qr 
  
  idAsignatura: any;
  seccion: any;
  asignatura: any;
  docente: any;
  correo: any;


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
      this.jsonData = JSON.parse(this.data);
      this.idAsignatura = this.jsonData.idAsignatura;
      this.seccion = this.jsonData.seccion;
      this.asignatura = this.jsonData.asignatura;
      this.docente = this.jsonData.docente;
      this.correo = this.jsonData.correo;
      // this.ramo = barcodeData.text;
      this.guardar();
    }).catch(err => {
      console.log('Error', err);
    });
  }

  salir() {
    localStorage.setItem('ingresado','false')
    localStorage.removeItem('ingresado')
    this.router.navigate(['/login'])
  }

  guardar(){
    this.dbservice.addAsistencia(this.idAlumno,this.asignatura,this.fechaActual);
    this.dbservice.presentToast("Asistencia Agregada")  }

  recuperaridAlumno() {
    var id = JSON.parse(localStorage.getItem('idUsuario'));
    this.idAlumno = id.id;
  }

}

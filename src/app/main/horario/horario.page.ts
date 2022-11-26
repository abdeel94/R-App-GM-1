import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { ToastController, Animation, AnimationController } from '@ionic/angular';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  @ViewChild("slidingCard", { read: ElementRef, static: true }) slidingCard: ElementRef;

  constructor(private animationCtrl: AnimationController, public toastController: ToastController, private emailComposer: EmailComposer,) { }

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
  datoJson: any;
  elementType = NgxQrcodeElementTypes.URL;
  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  dato: any = {
    idAsignatura: "",
    seccion: "",
    asignatura: "",
    docente: "",
    correo: "",
  };


  limpiar() {
    //recorrer todas las entradas de Object entries y obtener su clave y valor
    for (var [key, value] of Object.entries(this.dato)) {
      Object.defineProperty(this.dato, key, { value: "" })
    }
  }

  mostrar() {
    if (this.dato.idAsignatura != "" && this.dato.seccion != "" && this.dato.asignatura != "" && this.dato.docente != "" && this.dato.correo != "") {
      this.presentToast("correcto", 1200)
      this.datoJson = "{\"idAsignatura\": \"" + this.dato.idAsignatura + "\", \"seccion\": \"" + this.dato.seccion + "\", \"asignatura\": \"" + this.dato.asignatura + "\", \"docente\": \"" + this.dato.docente + "\", \"correo\": \"" + this.dato.correo + "\" } "
      this.limpiar();
    } else {
      this.presentToast("Ingrese todos los datos por favor.", 1200)
      this.limpiar();
    }
  }

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 1500,
    });
    toast.present();
  }

  hasAccount = false;

  async checkAccount() {
    this.hasAccount = await this.emailComposer.hasAccount();
  }

  async openEmail() {
    const email: EmailComposerOptions = {
      to: "abdeel4991@hotmail.com",
      // cc: this.userName+'@duocuc.cl',
      // attachments: [this.canvas
      // ],
      subject: 'Asistencia ',
      body: ' Nombre Alumno: ',
      isHtml: true,
    };
    await this.emailComposer.open(email);
    this.presentToast("Correo de asistencia enviado.");
  }

}

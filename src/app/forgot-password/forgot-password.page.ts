import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  correo = {
    Correo: "",
  };
  hasAccount = false;
  field: String = "";

  constructor(private emailComposer: EmailComposer,private router: Router,public toastController: ToastController,) { }

  ngOnInit() {
  }

  // this.emailComposer.isAvailable().then((available: boolean) =>{
  //   if(available) {
  //     sendMail();
  //   }
  //  });

  async checkAccount(){
    this.hasAccount = await this.emailComposer.hasAccount();
  }

  async openEmail(){
    if (this.validateModel(this.correo)) {
    const email: EmailComposerOptions = {
      to: this.correo+'@duocuc.cl',
      subject: 'Recuperación de contraseña',
      body: 'Su contraseña es 123456.',
    };
    await this.emailComposer.open(email);
    this.presentToast("Correo de asistencia enviado.");
  }else {
    this.presentToast("Contraseña incorrecta.", 1200)
  }
  }

  salir() {
    localStorage.setItem('ingresado','false')
    localStorage.removeItem('ingresado')
    this.router.navigate(['/login'])
  }

  validateModel(model: any) {
    //Recorrer todas las entradas que me entrega el Object entries y obtengo su clave-valor
    for (var [key, value] of Object.entries(model)) {
      //si el value está vacio retorno falso y guardo el nombre del campo para el error
      if (value == "") {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 1500,
    });
    toast.present();
  }
}


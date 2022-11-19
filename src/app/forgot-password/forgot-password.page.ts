import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  hasAccount = false;
  var1= 'prueba var 1';

  constructor(private emailComposer: EmailComposer,private router: Router) { }

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
    const email: EmailComposerOptions = {
      to: 'ab.morales@duocuc.cl',
      subject: 'Recuperación de contraseña',
      body: 'Su contraseña es 123456.',
    };
    await this.emailComposer.open(email);
  }

  salir() {
    localStorage.setItem('ingresado','false')
    localStorage.removeItem('ingresado')
    this.router.navigate(['/login'])
  }

}


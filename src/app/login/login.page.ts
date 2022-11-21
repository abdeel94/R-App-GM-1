import { Component, OnInit, } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, NavController, NavParams, AlertController } from '@ionic/angular';
import { ApijsonService } from 'src/app/services/apijson.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [NavParams]
})


export class LoginPage implements OnInit {
  /**
   * Se genera el modelo user con dos claves
   * cada clave tiene su valor inicial
   */
  user = {
    Usuario: "",
    Contrasena: "",
  }

  alumno: any;

  field: String = "";//para guardar si encuentro un campo vacio

  constructor(private router: Router,
    private api: ApijsonService,
    public toastController: ToastController,
  ) { } // Se debe instanciar

  ngOnInit() {
    localStorage.setItem('ingresado','false');
    localStorage.removeItem('ingresado'); // esto es para evitar que se pueda entrar con el back de android
  }


  nombre: any;
  id: any;
  username: any;

  guardar() {
    if (this.validateModel(this.user)) {
      let navigationExtras: NavigationExtras = {
        state: { User: this.user }
      };

      for (let i = 1; i < this.alumno.length; i++) {

        if (this.user.Usuario == this.alumno[i].username) {
          this.nombre = this.alumno[i].nombre;
          this.id = this.alumno[i].id;
          this.username = this.alumno[i].username;
          if (this.user.Contrasena == this.alumno[i].password) {
            var nombreUsuario = { nombre: this.nombre }
            var idUsuario = { id: this.id }
            var username = {username: this.username}
            localStorage.setItem('ingresado', 'true')
            localStorage.setItem('nombreUsuario', JSON.stringify(nombreUsuario))
            localStorage.setItem('idUsuario', JSON.stringify(idUsuario))
            localStorage.setItem('username', JSON.stringify(username))
            this.router.navigate(['/tab-inicial'], navigationExtras)
            .then(() => {window.location.reload();});

          } else {
            this.presentToast("Contraseña incorrecta.", 1200)
          }
        }
      }
    } else {
      if (this.field == "Contrasena") { this.presentToast("Debe ingresar: Contraseña.", 1200) }
      else { this.presentToast("Debe ingresar: " + this.field + ".", 1200) }
    }
  }



  ionViewWillEnter() {
    this.getAlumnos();
  }

  getAlumnos() {
    this.api.getAlumnos().subscribe((data) => {
      let val = Object.values(data)
      let val2 = Object.values(val[0])

      this.alumno = val2;

    })

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
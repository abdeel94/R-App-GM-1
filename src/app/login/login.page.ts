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
    localStorage.setItem('ingresado', 'false'); // esto es para evitar que se pueda entrar con el back de android
  }

  ingresar() {
    //verifico campos vacíos
    if (this.validateModel(this.user)) {
      this.presentToast("Bienvenido " + this.user.Usuario);
      // Se declara e instancia un elemento de tipo NavigationExtras
      let navigationExtras: NavigationExtras = {
        ///// modificar desde ahi
        state: {
          user: this.user // Al estado se asignamos un objeto con clave y valor
        }
      };
      this.router.navigate(['tab-inicial'], navigationExtras); // navegamos hacia el Home y enviamos información adicional
    } else {
      if (this.field == "Contrasena") { this.presentToast("Debe ingresar: Contraseña.", 4500) }
      else { this.presentToast("Debe ingresar: " + this.field + ".", 4500) }
    }


  }

  nombre: any;

  guardar() {
    if (this.validateModel(this.user)) {
      let navigationExtras: NavigationExtras = {
        state: { User: this.user }
      };

      for (let i = 1; i < this.alumno.length; i++) {

        if (this.user.Usuario == this.alumno[i].username) {
          this.nombre = this.alumno[i].nombre;
          if (this.user.Contrasena == this.alumno[i].password) {
            var nombreUsuario={nombre: this.nombre}
            localStorage.setItem('ingresado', 'true')
            localStorage.setItem('nombreUsuario',JSON.stringify(nombreUsuario))
            this.router.navigate(['tab-inicial'], navigationExtras);
            localStorage.setItem('ingresado', 'true')

          } 
        }
      }
    } else {
      this.presentToast('Error')
    }
  }



  ionViewWillEnter(){
    this.getAlumnos();
  }

  getAlumnos(){
    // localStorage.setItem('ingresado', 'false')
    this.api.getAlumnos().subscribe((data)=>{
      let val = Object.values(data)
      let val2 = Object.values(val[0])

      this.alumno = val2;

    })

  }

  /**
 * validateModel sirve para validar que se ingrese algo en 
 * los campos del html mediante su modelo
 */

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
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }









}
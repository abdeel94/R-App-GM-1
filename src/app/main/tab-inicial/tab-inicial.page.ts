import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab-inicial',
  templateUrl: './tab-inicial.page.html',
  styleUrls: ['./tab-inicial.page.scss'],
})
export class TabInicialPage {
  user: any;
  dataName: any;
  idUser: any;

  constructor(private activeroute: ActivatedRoute, private router: Router, private toastController:ToastController) {
    this.activeroute.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.user)
      }
    })
  }


  recuperarNombre() {
    var user1 = JSON.parse(localStorage.getItem('nombreUsuario'));
    var id = JSON.parse(localStorage.getItem('idUsuario'));
    this.idUser = id.id;
    this.dataName = user1.nombre;
    this.dataName = this.dataName.toLowerCase();
    this.dataName = this.dataName.split(" ")[0];
  }

  ngOnInit() {
    // this.presentToast('hola');
    window.location.reload;
    this.recuperarNombre();
  }

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 1500,
    });
    toast.present();
  }

}

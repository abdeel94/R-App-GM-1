import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ToastController, Animation, AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  @ViewChild("slidingCard", { read: ElementRef, static: true }) slidingCard: ElementRef;

  constructor(private animationCtrl: AnimationController, public toastController: ToastController,) { }

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
  datoJson:any;

  dato: any={
    idAsignatura:"",
    seccion:"",
    asignatura:"",
    docente:"",
    correo: "",
  };

  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
  
  limpiar(){
    //recorrer todas las entradas de Object entries y obtener su clave y valor
    for(var [key,value] of Object.entries(this.dato)){
      Object.defineProperty(this.dato,key,{value:""})
    }
  }

  mostrar(){
    if (this.dato.idAsignatura!="" && this.dato.seccion!=""  && this.dato.asignatura!=""  && this.dato.docente!=""  && this.dato.correo!="") {
      this.presentToast("correcto",1200)
      this.datoJson = "{\"idAsignatura\": \""+this.dato.idAsignatura+"\", \"seccion\": \""+this.dato.seccion+"\", \"asignatura\": \""+this.dato.asignatura+"\", \"docente\": \""+this.dato.docente+"\", \"correo\": \""+this.dato.correo+"\" } "
    } else {
      this.presentToast("Ingrese todos los datos por favor.",1200)
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

  public downloadQRCode() {
    const fileNameToDownload = 'image_qrcode';
    const base64Img = document.getElementsByClassName('coolQRCode')[0].children[0]['src'];   fetch(base64Img)
       .then(res => res.blob())
       .then((blob) => {
          // IE
          // if (window.navigator && window.navigator.msSaveOrOpenBlob){
          //    window.navigator.msSaveOrOpenBlob(blob,fileNameToDownload);
          // } else { // Chrome
             const url = window.URL.createObjectURL(blob);
             const link = document.createElement('a');
             link.href = url;
             link.download = fileNameToDownload;
             link.click();
          // }
       })
 }

}

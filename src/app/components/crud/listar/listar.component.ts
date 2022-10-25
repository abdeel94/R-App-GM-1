import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Asistencia } from 'src/app/clases/asistencia';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {

  asistencias: Asistencia[];

  constructor(private serviceDB:DbserviceService) { }

  ngOnInit() {
    this.serviceDB.dbState().subscribe((res)=>{
      if(res){
        this.serviceDB.fetchAsistencias().subscribe(item=>{
          this.asistencias=item;
        })
      }
    })
  }

  getItem($event) {
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);
    this.serviceDB.presentToast(valor);

  }

  eliminar(item) {
    this.serviceDB.deleteAsistencia(item.id);
    this.serviceDB.presentToast("Asistencia Eliminada");
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {

  idAlumno="";
  ramo="";
  fecha="";

  constructor(private dbservice: DbserviceService, private router: Router) { }

  guardar(){
    this.dbservice.addAsistencia(this.idAlumno,this.ramo,this.fecha);
    this.dbservice.presentToast("Asistencia Agregada")
    this.router.navigate(['/tab-inicial']);
  }

  ngOnInit() {}

}

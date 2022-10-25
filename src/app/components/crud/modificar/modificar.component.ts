import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss'],
})
export class ModificarComponent implements OnInit {

  id = "";
  idAlumno="";
  ramo="";
  fecha="";

  constructor(private router:Router, private activedroute: ActivatedRoute, private dbservice: DbserviceService) {
    this.activedroute.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.id = this.router.getCurrentNavigation().extras.state.idEnviado;
        this.idAlumno = this.router.getCurrentNavigation().extras.state.idAlumnoEnviado;
        this.ramo = this.router.getCurrentNavigation().extras.state.ramoEnviado;
        this.fecha = this.router.getCurrentNavigation().extras.state.fechaEnviado;
      }
    })
   }

   editar(){
    this.dbservice.updateAsistencia(this.id, this.idAlumno,this.ramo,this.fecha);
    this.dbservice.presentToast("Asistencia Modificada");
    this.router.navigate(['/tab-inicial']);
  }


  ngOnInit() {}

}

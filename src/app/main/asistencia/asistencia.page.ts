import { Component, OnInit} from '@angular/core';
import {formatPercent} from '@angular/common';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {


  constructor(){}


  ngOnInit() {
  }


  ramos: any[] = [
    { id: 101, nombre: "Matemáticas", clasesRealizadas: 12, clasesAsistidas: 11},
    { id: 102, nombre: "Programación", clasesRealizadas: 10, clasesAsistidas: 10},
    { id: 103, nombre: "Inglés", clasesRealizadas: 16, clasesAsistidas: 12},
    { id: 104, nombre: "Comunicación", clasesRealizadas: 8, clasesAsistidas: 2},
    { id: 105, nombre: "Base de datos", clasesRealizadas: 8, clasesAsistidas: 7},
    { id: 106, nombre: "Ética", clasesRealizadas: 10, clasesAsistidas: 5},
  ]

}

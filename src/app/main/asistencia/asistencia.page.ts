import { Component, ViewChild, OnInit } from '@angular/core';
import { formatPercent } from '@angular/common';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { thomsonCrossSectionDependencies } from 'mathjs';
import { element } from 'protractor';
import * as ApexCharts from 'apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
  public amarillo : number = null;
  public verde : number = null;

  constructor() {
    this.chartOptions = {
      series: [],

      labels: ["fifty", "double"],
      chart: {
        width: 180,
        type: "donut"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    // valores de aceptacion de asistencia
    this.verde = 0.9;
    this.amarillo = 0.6;


  }



  ngOnInit() {

  }



  ramos: any[] = [
    { id: 101, nombre: "Matemáticas", clasesRealizadas: 12, clasesAsistidas: 11 },
    { id: 102, nombre: "Programación", clasesRealizadas: 10, clasesAsistidas: 10 },
    { id: 103, nombre: "Inglés", clasesRealizadas: 16, clasesAsistidas: 12 },
    { id: 104, nombre: "Comunicación", clasesRealizadas: 8, clasesAsistidas: 2 },
    { id: 105, nombre: "Base de datos", clasesRealizadas: 8, clasesAsistidas: 7 },
    { id: 106, nombre: "Ética", clasesRealizadas: 10, clasesAsistidas: 5 },
  ]
  datos: any[] = [];




  series = [
    { name: "serie1", datos: [80, 20] },
    { name: "serie2", datos: [10, 90] },
    { name: "serie3", datos: [20, 80] }]



  getChartData() {


    var first = Number;
    var second = Number;
    this.ramos.forEach((element) => {
      first = element.clasesRealizadas;
      second = element.clasesAsistidas;
      this.datos.push([first, second]);
    })



  }





}

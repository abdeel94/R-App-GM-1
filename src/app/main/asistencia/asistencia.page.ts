import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { formatPercent } from '@angular/common';
import { ChartComponent } from "ng-apexcharts";
import { Animation, AnimationController } from '@ionic/angular';

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

  @ViewChild("button", { read: ElementRef, static: true }) button: ElementRef;
  @ViewChild("slidingCard", { read: ElementRef, static: true }) slidingCard: ElementRef;


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  // construccion de clase para pasar variable de ts a html 
  public amarillo: number = null;
  public verde: number = null;



  constructor(private animationCtrl: AnimationController) {




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

    // valores de aceptacion de asistencia, aca se asigna el valor de la variable que se quiere pasar del ts al html
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

  ngAfterViewInit() {
    this.pulseButton()
    // this.animateButton();
    this.slideCard();


  }


  // public animateButton() {
  //   const animation = this.animationCtrl
  //     .create()
  //     .addElement(this.button.nativeElement)
  //     .duration(1000)
  //     .iterations(Infinity)
  //     .fromTo("color", "#ffffff", "#ffb800")

  //   animation.play()
  // }

  public pulseButton() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.button.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, boxShadow: "0 0 0 0 rgba(44, 103, 255, 0.4)" },
        { offset: 0.7, boxShadow: "0 0 0 10px rgba(44, 103, 255, 0)" },
        { offset: 1, boxShadow: "0 0 0 0 rgba(44, 103, 255, 0)" }
      ]);

    animation.play();
  }

  public slideCard() {

    const animationA = this.animationCtrl
      
      .create()
      .addElement(this.slidingCard.nativeElement)
      .duration(900)
      .iterations(1)
      .fromTo('transform', 'translateX(200px)', 'translateX(0px)')
      .fromTo('opacity', '0', '1');
    animationA.play();
  }






}

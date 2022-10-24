import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  @ViewChild("slidingCard", { read: ElementRef, static: true }) slidingCard: ElementRef;

  constructor(private animationCtrl: AnimationController) { }

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


}

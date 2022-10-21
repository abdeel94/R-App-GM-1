import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tab-inicial',
  templateUrl: './tab-inicial.page.html',
  styleUrls: ['./tab-inicial.page.scss'],
})
export class TabInicialPage {
  user: any;
  user2: any;

  constructor(private activeroute: ActivatedRoute, private router: Router) { this.activeroute.queryParams.subscribe(params => {

    if (this.router.getCurrentNavigation().extras.state) {

      this.user = this.router.getCurrentNavigation().extras.state.user;
      console.log(this.user)
    }})
}


recuperarNombre(){
  var user1 = JSON.parse(localStorage.getItem('nombreUsuario'));
  this.user2 = user1.nombre;
  return this.user2;
}

ngOnInit(){
  this.recuperarNombre();
}

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  user: any

  constructor(
    public router: Router
  ){
    this.user = JSON.parse(localStorage.getItem('user') as unknown as string)
  }

  

  deslogar(){
    // this.router.navigate(['concessionaria/page/home'])
    localStorage.clear()
    window.location.href = "http://localhost:4200/concessionaria/page/home"
  }

}

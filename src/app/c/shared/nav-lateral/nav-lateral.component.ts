import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-lateral',
  templateUrl: './nav-lateral.component.html',
  styleUrls: ['./nav-lateral.component.scss']
})
export class NavLateralComponent {


  

  deslogar(){
   
    localStorage.clear()
    window.location.href = "http://localhost:4200/page/loginAdm"
  }


}

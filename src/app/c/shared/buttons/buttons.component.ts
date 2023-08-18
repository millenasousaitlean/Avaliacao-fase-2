import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  @Input() btnClass: string = ''
  @Input() textBtn: string = ''
  @Input() ngClass: string = ''


  @Output() clickNoButton = new EventEmitter<string>();
 


  constructor(public rotaAtiva: Router) {}
  clickNoBtn(): void{
    this.clickNoButton.emit() 
    
  }
  loginFAzer(): void{
    this.clickNoButton.emit() 
    
  }




}

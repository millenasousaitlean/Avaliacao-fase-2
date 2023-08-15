import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() imgCard: string = ''
  @Input() textCard: string = ''
  @Input() rotaCard: any 
  @Input() classCard: string = ''
  @Input() clickCard: string = ''
  @Input() link: boolean = false




  
}

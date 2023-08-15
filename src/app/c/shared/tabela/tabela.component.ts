import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent {

  @Input() colunaTabela: string[] = [];
  @Input() linhasTabela: string[]= [];
  @Input() info: string = '';
  @Input() classTable: string = '';

  @Output() clickLink: string = '';



  
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Carros } from 'src/app/model/carros';
import { Coluna } from 'src/app/model/coluna';
import { ConteudoSite } from 'src/app/model/conteudo-site';
import { Marcas } from 'src/app/model/marcas';
import { ModeloDeCarro } from 'src/app/model/modelo-de-carro';
import { Usuarios } from 'src/app/model/usuarios';
import { CarrosService } from 'src/app/service/concessionaria/carros.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent {
  marcas: Marcas[] = [];

  @Input() tituloTable: string = '';

  @Input() classTable: string = '';
  @Input() conteMarca: string = '';
  @Input() conteModelo: string = '';
  @Input() conteSugestao: string = '';

  @Output() clickLink: string = '';

  @Input() conteudo: any[] = []
  @Input() cols: Coluna[] = [];

  @Output() deletar = new EventEmitter<number>();
  @Output() openModalInfo = new EventEmitter<any>();
  @Output() editar = new EventEmitter<any>();


  constructor(
    public router: Router,
    public apiCarros: CarrosService
  ) { }


  getValue(name: string, row: any): any {
    return row[name]
  }

  deletarInfo(id: number): void {
    if (id) {
      this.deletar.emit(id);
    }
  }  

  openInfo(id: Event): void {
    if (id) {
      this.openModalInfo.emit(id)
    }
  }

  editarInfos(event: Event): void {
    if (event) {
      this.editar.emit(event)
      if (this.router.url.includes(`cms/table/carros`)) {
        this.router.navigate([`cms/table/new/carros/${event}`])
      } if (this.router.url.includes(`cms/table/modelosDeCarros`)) {
        this.router.navigate([`cms/table/new/modelosDeCarros/${event}`])
      } if (this.router.url.includes(`cms/table/marcas`)) {
        this.router.navigate([`cms/table/new/marcas/${event}`])
      } if (this.router.url.includes(`cms/table/usuarios`)) {
        this.router.navigate([`cms/table/new/usuarios/${event}`])
      }
    }

  }




}



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Marcas } from 'src/app/model/marcas';
import { Carros } from 'src/app/model/carros';
import { ModeloDeCarro } from 'src/app/model/modelo-de-carro';
import { CarrosService } from 'src/app/service/concessionaria/carros.service';

@Component({
  selector: 'app-interna',
  templateUrl: './interna.component.html',
  styleUrls: ['./interna.component.scss']
})
export class InternaComponent implements OnInit{

  car: Carros[] = [];
  modelos: ModeloDeCarro[] = [];
  marcas: Marcas[] = []
  idDaUrl: number = 0

  constructor(
    public router: Router,
    private rotaAtiva: ActivatedRoute,
    private apiCarros: CarrosService
  ){}



  ngOnInit(): void {
    this.idDaUrl = this.rotaAtiva.snapshot.params['id']
    this.pegarInfosCarros()
    this.pegarInfosMarca()
    this.pegarInfosModelos()

  }

  todosPorId: number[] = []
  todosModelosPorId: number[] = []

  pegarInfosCarros(): void{
    this.apiCarros.getAllCarros().subscribe({
      next: (resp) => {
        this.car = resp
        for( let i = 0; i < this.car.length; i++ ){
          if( this.car[i].marca == this.idDaUrl ){
            this.todosPorId.push(this.car[i].id)
          }
        }
        for( let i = 0; i < this.car.length; i++ ){
          if( this.car[i].modelo == this.idDaUrl ){
            this.todosModelosPorId.push(this.car[i].id)
          }
        }
        // console.log(this.todosPorId)
        // console.log('carros',this.car)
      }, error: (erro) => {
        console.log(erro)
      }
    })
  }



  pegarInfosMarca(){
    this.apiCarros.getAllMarcas().subscribe({
      next: (resp) => {
        this.marcas =resp
      }
    })
  }
  pegarInfosModelos(){
    this.apiCarros.getAllModelos().subscribe({
      next: (resp) => {
        this.modelos =resp
      }
    })
  }

 
  findMarca(): string{
    for(let d of this.marcas){
      if(d.id == this.idDaUrl){
        return d.marca
      }
      // console.log('aqui', this.marcas)
    }
    return ''
  }

  findModelo(): string{
    for(let f of this.modelos){
      if(f.id == this.idDaUrl){
        return f.modelo
      }
      // console.log('aqui', this.marcas)
    }
    return ''
  }


}

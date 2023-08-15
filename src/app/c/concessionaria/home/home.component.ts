import { Component, OnInit } from '@angular/core';
import { Carros } from 'src/app/model/carros';
import { Marcas } from 'src/app/model/marcas';
import { CarrosService } from 'src/app/service/concessionaria/carros.service';
import { ModeloDeCarro } from 'src/app/model/modelo-de-carro';
import { ConteudoSite } from 'src/app/model/conteudo-site';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  modelos: ModeloDeCarro[] = []
  marcas: Marcas[] = []
  titulos: ConteudoSite =  new ConteudoSite ()


  constructor(
    private apiCarros: CarrosService

  ){}


  ngOnInit(): void {
    this.pegarInfosCarros()
    this.pegarInfosMarcas()
    this.pegarConteudoSite()
  }


  pegarInfosCarros(): void{
    this.apiCarros.getAllModelos().subscribe({
      next: (resp) => {
        this.modelos = resp
        // console.log('carros',this.modelos)
      }, error: (erro) => {
        console.log(erro)
      }
    })
  }

  pegarInfosMarcas(): void{
    this.apiCarros.getAllMarcas().subscribe({
      next: (resp) => {
        this.marcas = resp
        // console.log('marcas', this.marcas)
      }, error: (erro) => {
        console.log(erro)
      }
    })
  }

  pegarConteudoSite(): void{
    this.apiCarros.getAllConteudo().subscribe({
      next: (resp) => {
        this.titulos = resp
        // console.log('titulos', this.titulos)
      }, error: (erro) => {
        console.log(erro)
      }
    })
  }



}

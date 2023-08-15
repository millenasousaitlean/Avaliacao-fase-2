import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carros } from 'src/app/model/carros';
import { Marcas } from 'src/app/model/marcas';
import { ModeloDeCarro } from 'src/app/model/modelo-de-carro';
import { ConteudoSite } from 'src/app/model/conteudo-site';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  readonly baseUrl: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ){}


  // CARROS
  getAllCarros(): Observable<Carros[]> {
    return this.http.get<Carros[]>(`${this.baseUrl}carros`)
  }

  getCarrosPorId(id: number): Observable<Carros> {
    return this.http.get<Carros>(`${this.baseUrl}carros/${id}`)
  }


  // MARCAS
  getAllMarcas(): Observable<Marcas[]> {
    return this.http.get<Marcas[]>(`${this.baseUrl}marcas`)
  }

  getMarcasPorId(id: number): Observable<Marcas> {
    return this.http.get<Marcas>(`${this.baseUrl}marcas/${id}`)
  }

  // MODELO DE CARRO
  getAllModelos(): Observable<ModeloDeCarro[]> {
    return this.http.get<ModeloDeCarro[]>(`${this.baseUrl}modelosDeCarro`)
  }

  getModelosPorId(id: number): Observable<ModeloDeCarro> {
    return this.http.get<ModeloDeCarro>(`${this.baseUrl}modelosDeCarro/${id}`)
  }

  // CONTEUDO SITE
  getAllConteudo(): Observable<ConteudoSite> {
    return this.http.get<ConteudoSite>(`${this.baseUrl}conteudoSite`)
  }








}

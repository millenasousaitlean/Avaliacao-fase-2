import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carros } from 'src/app/model/carros';
import { ConteudoSite } from 'src/app/model/conteudo-site';
import { FazerLogin } from 'src/app/model/fazer-login';
import { Marcas } from 'src/app/model/marcas';
import { ModeloDeCarro } from 'src/app/model/modelo-de-carro';
import { Usuarios } from 'src/app/model/usuarios';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

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

  postEditarCarro(car: Carros): Observable<Carros>{
    return this.http.post<Carros>(`${this.baseUrl}carros`, car)
  }
  putEditarCarro(car: Carros): Observable<Carros>{
    return this.http.put<Carros>(`${this.baseUrl}carros`, car)
  }

  deletarCarros(id: number): Observable<Carros>{
    return this.http.delete<Carros>(`${this.baseUrl}carros/${id}`)
  } 

  // MODELOS
  getAllModelos(): Observable<ModeloDeCarro[]> {
    return this.http.get<ModeloDeCarro[]>(`${this.baseUrl}modelosDeCarro`)
  }

  getModelosPorId(id: number): Observable<ModeloDeCarro> {
    return this.http.get<ModeloDeCarro>(`${this.baseUrl}modelosDeCarro/${id}`)
  }

  postEditarModelo(mode: ModeloDeCarro): Observable<ModeloDeCarro>{
    return this.http.post<ModeloDeCarro>(`${this.baseUrl}modelosDeCarro`, mode)
  }

  putEditarModelo(mode: ModeloDeCarro): Observable<ModeloDeCarro>{
    return this.http.put<ModeloDeCarro>(`${this.baseUrl}modelosDeCarro`, mode)
  }

  deletarModelo(id: number): Observable<ModeloDeCarro>{
    return this.http.delete<ModeloDeCarro>(`${this.baseUrl}modelosDeCarro/${id}`)
  } 

  // MARCAS
  getAllMarcas(): Observable<Marcas[]> {
    return this.http.get<Marcas[]>(`${this.baseUrl}marcas`)
  }

  getMarcasPorId(id: number): Observable<Marcas> {
    return this.http.get<Marcas>(`${this.baseUrl}marcas/${id}`)
  }

  postEditarMarca(marc: Marcas): Observable<Marcas>{
    return this.http.post<Marcas>(`${this.baseUrl}marcas`, marc)
  }

  putEditarMarca(marc: Marcas): Observable<Marcas>{
    return this.http.put<Marcas>(`${this.baseUrl}marcas`, marc)
  }
  
  deletarMarca(id: number):  Observable<Marcas>{
    return this.http.delete<Marcas>(`${this.baseUrl}marcas/${id}`)
  } 

  // USUARIOS
  getUsuariosLogin(login: string): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.baseUrl}usuarios/?username=${login}`)
  }
  getUsuariosPorId(id: number): Observable<Usuarios>{
    return this.http.get<Usuarios>(`${this.baseUrl}usuarios/${id}`)
  }

  getUsuariosLoginAdm(login: string, tipo: string): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.baseUrl}usuarios/?username=${login}&tipo=${tipo}`)
  }
  getAllUsuarioscadastro(): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.baseUrl}usuarios`)
  }

  postCriarNewUsuario(user: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.baseUrl}usuarios`, user)
  }

  deletarUsuario(id: number):  Observable<Usuarios>{
    return this.http.delete<Usuarios>(`${this.baseUrl}usuarios/${id}`)
  } 

  putEditarUsuario(user: Usuarios): Observable<Usuarios>{
    return this.http.put<Usuarios>(`${this.baseUrl}usuarios`, user)
  }

  // FAZERLOGIN
  getAllUsernames(): Observable<FazerLogin[]> {
    return this.http.get<FazerLogin[]>(`${this.baseUrl}fazerLogin`)
  }

  getLogin(login: string, senha: string): Observable<FazerLogin[]> {
    return this.http.get<FazerLogin[]>(`${this.baseUrl}fazerLogin/?username=${login}&senha=${senha}`)
  }

  postCriarNewLogin(login: FazerLogin): Observable<FazerLogin> {
    return this.http.post<FazerLogin>(`${this.baseUrl}fazerLogin`, login)
  }
  getFazerLoginPorId(id: number): Observable<FazerLogin> {
    return this.http.get<FazerLogin>(`${this.baseUrl}fazerLogin/${id}`)
  }

  putEditarLogin(log: FazerLogin): Observable<FazerLogin>{
    return this.http.put<FazerLogin>(`${this.baseUrl}fazerLogin`, log)
  }

  deletarFazerLogin(id: number):  Observable<Usuarios>{
    return this.http.delete<Usuarios>(`${this.baseUrl}fazerLogin/${id}`)
  } 

  // CONTEUDO SITE
  getAllConteudo(): Observable<ConteudoSite> {
    return this.http.get<ConteudoSite>(`${this.baseUrl}conteudoSite`)
  }

  putEditarConteudo(conte: ConteudoSite): Observable<ConteudoSite>{
    return this.http.put<ConteudoSite>(`${this.baseUrl}conteudoSite`, conte)
  }

  deletarConteudoSite(id: number):  Observable<FazerLogin>{
    return this.http.delete<FazerLogin>(`${this.baseUrl}conteudoSite/${id}`)
  } 




}

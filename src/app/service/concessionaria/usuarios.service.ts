import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FazerLogin } from 'src/app/model/fazer-login';
import { Usuarios } from 'src/app/model/usuarios';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  readonly baseUrl: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) {}

  // Fazer Login
  getAllUsernames(): Observable<FazerLogin[]> {
    return this.http.get<FazerLogin[]>(`${this.baseUrl}fazerLogin`)
  }

  getLogin(login: string, senha: string, tipo: string): Observable<FazerLogin[]> {
    return this.http.get<FazerLogin[]>(`${this.baseUrl}fazerLogin/?username=${login}&senha=${senha}&tipo=${tipo}`)
  }

  postCriarNewLogin(login: FazerLogin): Observable<FazerLogin> {
    return this.http.post<FazerLogin>(`${this.baseUrl}fazerLogin`, login)
  }

  // Usuarios
  getUsuariosLogin(login: string): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.baseUrl}usuarios/?username=${login}`)
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








}

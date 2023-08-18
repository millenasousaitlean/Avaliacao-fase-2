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

  getAllUsernames(): Observable<FazerLogin[]> {
    return this.http.get<FazerLogin[]>(`${this.baseUrl}fazerLogin`)
  }

  getLogin(login: string, senha: string): Observable<FazerLogin[]> {
    return this.http.get<FazerLogin[]>(`${this.baseUrl}`)
  }

  getUsuariosLogin(): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.baseUrl}`)
  }









}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from 'src/app/model/usuarios';
import { FazerLogin } from 'src/app/model/fazer-login';
import { UsuariosService } from 'src/app/service/concessionaria/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  usuarios: FazerLogin[] = [];
  infoUsuarios: Usuarios[] = [];

  isLoading = false;
  errorLogin: string = '';
  openModal = false;


  constructor(
    private rotaAtiva: ActivatedRoute,
    private router: Router,
    private apiUsuarios: UsuariosService
  ) {
    this.formLogin = new FormGroup({
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })
  }


  ngOnInit(): void {
    this.rotaAtiva.queryParams.subscribe(params => {
    })
  }



  fazerLogin(): void {

    this.apiUsuarios.getLogin(this.formLogin.value.login, this.formLogin.value.senha, "cliente").subscribe((data) => {
      this.usuarios = data
      this.apiUsuarios.getUsuariosLogin(this.formLogin.value.login).subscribe((resp) => {
        this.infoUsuarios = resp

        this.isLoading = true;
        setTimeout(() => {

          if (data.length > 0 && resp.length > 0) {
            localStorage.setItem('user', JSON.stringify(data[0]))
            localStorage.setItem('usuario', JSON.stringify(resp[0]))

            window.location.href = "http://localhost:4200/concessionaria/page/home"
          } else {
            this.isLoading = false;
            this.openModal = true;
            this.errorLogin = 'Ops... Ocorreu um erro!'
          }
        }, 1700)

      })
    })
  }

  fecharModal(): void {
    this.openModal = false
  }



}

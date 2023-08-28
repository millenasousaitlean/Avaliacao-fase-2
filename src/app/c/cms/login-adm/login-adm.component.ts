import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/concessionaria/usuarios.service';
import { FazerLogin } from 'src/app/model/fazer-login';
import { Usuarios } from 'src/app/model/usuarios';

@Component({
  selector: 'app-login-adm',
  templateUrl: './login-adm.component.html',
  styleUrls: ['./login-adm.component.scss']
})
export class LoginAdmComponent implements OnInit{

  formLoginAdm: FormGroup
  usuarios: FazerLogin[] = [];
  infoUsuarios: Usuarios[] = [];

  isLoading = false;
  errorLogin: string = '';
  openModal = false;

  constructor(
    private rotaAtiva: ActivatedRoute,
    private router: Router,
    private apiUsuarios: UsuariosService
  ){
    this.formLoginAdm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.rotaAtiva.queryParams.subscribe(params => {
    })
  }

 



  fazerLoginAdm(): void {

    this.apiUsuarios.getLogin(this.formLoginAdm.value.login, this.formLoginAdm.value.senha, "cliente").subscribe((data) => {
      this.usuarios = data
      this.apiUsuarios.getUsuariosLoginAdm(this.formLoginAdm.value.login, "admin").subscribe((resp) => {
        this.infoUsuarios = resp

        this.isLoading = true;
        setTimeout(() => {

          if (data.length > 0 && resp.length > 0) {
            localStorage.setItem('user', JSON.stringify(data[0]))
            localStorage.setItem('usuario', JSON.stringify(resp[0]))

            window.location.href = "http://localhost:4200/cms/table/carros"
          } else {
            this.isLoading = false;
            this.openModal = true;
            this.errorLogin = 'Acesso permitido somente para administradores!'
          }
        }, 1700)

      })
    })
  }



  fecharModal(): void {
    this.openModal = false
  }

  

}

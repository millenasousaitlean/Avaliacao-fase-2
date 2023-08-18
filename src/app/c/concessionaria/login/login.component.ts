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

  isLogin = false;
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
    this.fazerLogin()
  }

  onLogin() {
    
    window.location.href = "http://localhost:4200/concessionaria/page/home"
    return 
  }


  fazerLogin(): void {
    console.log('formLogin',this.formLogin)
    this.isLogin = true;

    this.apiUsuarios.getLogin(this.formLogin.value.login, this.formLogin.value.senha).subscribe({
      next: (resposta) => {
        if (resposta.length > 0) {
          localStorage.setItem('user', JSON.stringify(resposta[0]))
        } else {
          alert('Usuario e/ou senha incorreto')
        }
      }, error: (erro) => {
        console.log(erro)
      }
    })
  }

  acessarLogin(): void {
    const entrarLogin = {
      login: this.formLogin.value.login,
      senha: this.formLogin.value.senha
    }

    let usuarios: FazerLogin[] = []
    this.apiUsuarios.getAllUsernames().subscribe((data) => {
      usuarios = data
    })

    this.isLoading = true;
    setTimeout(() => {
      const usuario: any = usuarios.find((user) => {
        return user.username == entrarLogin.login && user.senha == entrarLogin.senha;
      })
      if (usuario) {
        let usuarios: any = {
          id: usuario.id,
          username: this.formLogin.value.login,
          senha: this.formLogin.value.login,
          idUsuario: usuario.idUsuario
        }
        const user = (localStorage.setItem('user', JSON.stringify(usuario)) as unknown as string)
        this.onLogin()
      } else {
        this.isLoading = false;
        this.openModal = true;
        this.errorLogin = 'Ops... Ocorreu um erro!'
      }
    }, 1500);
    
  }


  fecharModal(): void {
    this.openModal = false
  }



}

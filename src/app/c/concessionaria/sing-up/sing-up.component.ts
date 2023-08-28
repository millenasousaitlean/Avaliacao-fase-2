import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/model/usuarios';
import { FazerLogin } from 'src/app/model/fazer-login';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/service/concessionaria/usuarios.service';





@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  formCadastro: FormGroup;
  loginUser: FazerLogin[] = [];
  infosUser: Usuarios[] = [];

  openModalOK: boolean = false
  openJaCadastrado: boolean = false


  constructor(
    private apiUser: UsuariosService
  ) {
    this.formCadastro = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      nomeCompleto: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      confirmSenha: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
    }, this.validatePassword)
  }


  ngOnInit(): void {
    this.pegarInfos()
  }



  validatePassword(form: AbstractControl): { [ct: string]: boolean } | null {
    const password = form.get('senha') as FormControl
    const confiPasword = form.get('confirmSenha') as FormControl

    if (password.value !== confiPasword.value) {
      return { 'passwordInvalido': true }
    }
    return null
  }

  pegarInfos(): void {
    this.apiUser.getAllUsernames().subscribe({
      next: (data) => {
        this.loginUser = data
        this.apiUser.getAllUsuarioscadastro().subscribe({
          next: (resp) => {
            this.infosUser = resp
          }
        })
      }
    })
  }


  criarUser(): void {
    let infoUsuario: Usuarios = {
      id: 0,
      nomeCompleto: this.formCadastro.value.nomeCompleto,
      username: this.formCadastro.value.username,
      tipo: "cliente"
    }
    for (let user of this.infosUser) {
      if (user.username === this.formCadastro.value.username) {
        this.openJaCadastrado = true
        return
      }
    }
    this.apiUser.postCriarNewUsuario(infoUsuario).subscribe((resp) => {   
      let loginAdd: FazerLogin = {
        id: 0,
        username: this.formCadastro.value.username,
        senha: this.formCadastro.value.senha,
        idUsuario: resp.id
      }
      this.apiUser.postCriarNewLogin(loginAdd).subscribe((data) => {     
        this.openModalOK = true
      })     
    })
  }

  btnOk(){
    window.location.href = "http://localhost:4200/concessionaria/page/login"
  }

  closeModal(){
    this.openJaCadastrado = false
  }







}

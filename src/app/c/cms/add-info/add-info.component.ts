import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Carros } from 'src/app/model/carros';
import { FazerLogin } from 'src/app/model/fazer-login';
import { Marcas } from 'src/app/model/marcas';
import { ModeloDeCarro } from 'src/app/model/modelo-de-carro';
import { Usuarios } from 'src/app/model/usuarios';
import { CmsService } from 'src/app/service/cms/cms.service';
import { CarrosService } from 'src/app/service/concessionaria/carros.service';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.scss']
})
export class AddInfoComponent implements OnInit {

  infoMarca: Marcas[] = [];
  infoModelos: ModeloDeCarro[] = [];
  infosCar: Carros[] = [];

  carros: Carros = new Carros

  formCarros: FormGroup;
  formModelos: FormGroup;
  formMarcas: FormGroup;
  formUsuarios: FormGroup;

  infoDestaque: string = ''
  arrDestaque: string[] = []
  openModalAdd: boolean = false

  car: Carros = new Carros;
  modelos: ModeloDeCarro = new ModeloDeCarro;
  marca: Marcas = new Marcas;
  usuario: Usuarios = new Usuarios;
  fazLogin: FazerLogin = new FazerLogin;

  idDaUrl: number = 0
  rotaAtiva: any;

  constructor(
    public router: Router,
    private apiCarros: CarrosService,
    private apiCms: CmsService
  ) {
    this.formCarros = new FormGroup({
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      ano: new FormControl('', [Validators.required]),
      textoAnuncio: new FormControl('', [Validators.required]),
      complementoAnuncio: new FormControl('', [Validators.required]),
      quilometragem: new FormControl('', [Validators.required]),
      cambio: new FormControl('', [Validators.required]),
      cor: new FormControl('', [Validators.required]),
      combustivel: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      motor: new FormControl('', [Validators.required]),
      portas: new FormControl('', [Validators.required]),
      finalPlaca: new FormControl('', [Validators.required]),
      acessorios: new FormControl('', [Validators.required]),
      compra: new FormControl('', [Validators.required]),
      parcelasMaximas: new FormControl('', [Validators.required]),
      jurosMensais: new FormControl('', [Validators.required]),
      aluguelDia: new FormControl('', [Validators.required]),
      aluguelMes: new FormControl('', [Validators.required]),
      imagem1: new FormControl('', [Validators.required]),
      imagem2: new FormControl('', [Validators.required]),
      imagem3: new FormControl('', [Validators.required])
    })

    this.formModelos = new FormGroup({
      modelo: new FormControl('', [Validators.required]),
      imagem: new FormControl('', [Validators.required])
    })

    this.formMarcas = new FormGroup({
      modelo: new FormControl('', [Validators.required]),
      imagem: new FormControl('', [Validators.required])
    })

    this.formUsuarios = new FormGroup({
      nomeCompleto: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.idDaUrl = Number(this.rotaAtiva.snapshot.params['id'])
    this.getInfos()
    this.getCar(this.idDaUrl)
  }


  getInfos(): void {
    this.apiCms.getAllMarcas().subscribe({
      next: (data) => {
        this.infoMarca = data
        this.apiCms.getAllModelos().subscribe({
          next: (resp) => {
            this.infoModelos = resp
            this.apiCarros.getAllCarros().subscribe({
              next: (data) => {
                this.infosCar = data
              }
            })
          }
        })
      }
    })
  }

  getAll(): void {
    this.apiCms.getAllCarros().subscribe((data) => {

      this.onEditCarro(this.carros)
    })
  }

  addConteudoCar() {
    this.infoDestaque = this.formCarros.value.acessorios
    let acessoriosCarros = this.infoDestaque.split(',')
    this.arrDestaque = []
    for (let i = 0; i < acessoriosCarros.length; i++) {
      this.arrDestaque.push(acessoriosCarros[i])
    }
    let conteudoAcessorios: Carros = {
      id: this.formCarros.value.id,
      marca: this.formCarros.value.marca,
      modelo: this.formCarros.value.modelo,
      ano: this.formCarros.value.ano,
      textoAnuncio: this.formCarros.value.textoAnuncio,
      complementoAnuncio: this.formCarros.value.complementoAnuncio,
      quilometragem: this.formCarros.value.quilometragem,
      cambio: this.formCarros.value.cambio,
      cor: this.formCarros.value.cor,
      combustivel: this.formCarros.value.combustivel,
      categoria: this.formCarros.value.categoria,
      motor: this.formCarros.value.motor,
      portas: this.formCarros.value.portas,
      finalPlaca: this.formCarros.value.finalPlaca,
      acessorios: this.arrDestaque as [string],
      valores: {
        compra: this.formCarros.value.compra,
        parcelasMaximas: this.formCarros.value.parcelasMaximas,
        jurosMensais: this.formCarros.value.jurosMensais,
        aluguelDia: this.formCarros.value.aluguelDia,
        aluguelMes: this.formCarros.value.aluguelMes,
      },
      imagens: [
        this.formCarros.value.imagem1,
        this.formCarros.value.imagem2,
        this.formCarros.value.imagem3,
      ]
    }
    this.apiCms.postEditarCarro(conteudoAcessorios).subscribe((data) => {
      this.openModalAdd = true
      this.atualizaInfos()
      this.formCarros.reset()

    })
  }

  addConteudoMarca() {
    let contMarca: Marcas = {
      id: this.formMarcas.value.id,
      marca: this.formMarcas.value.marca,
      imagem: this.formMarcas.value.imagem
    }
    this.apiCms.postEditarMarca(contMarca).subscribe((data) => {
      this.atualizaInfos()
      this.formMarcas.reset()
      this.openModalAdd = true
    })
  }

  addConteudoModelo() {
    let contModelo: ModeloDeCarro = {
      id: this.formMarcas.value.id,
      modelo: this.formMarcas.value.modelo,
      imagem: this.formMarcas.value.imagem
    }
    this.apiCms.postEditarModelo(contModelo).subscribe((data) => {
      this.atualizaInfos()
      this.formModelos.reset()
      this.openModalAdd = true
    })
  }

  addConteudoUsuario() {
    let contUser: Usuarios = {
      id: 0,
      nomeCompleto: this.formUsuarios.value.nomeCompleto,
      username: this.formUsuarios.value.username,
      tipo: this.formUsuarios.value.tipo
    }
    this.apiCms.postCriarNewUsuario(contUser).subscribe((data) => {
    })
    let contLogin: FazerLogin = {
      id: 0,
      username: this.formUsuarios.value.username,
      senha: this.formUsuarios.value.senha,
      idUsuario: this.formUsuarios.value.idUsuario
    }
    this.apiCms.postCriarNewLogin(contLogin).subscribe((data) => {
      this.atualizaInfos()
      this.formUsuarios.reset()
      this.openModalAdd = true
    })
  }

  atualizaInfos() {
    this.getInfos()
  }

  closeModal() {
    this.openModalAdd = false
  }

  onEditCarro(evento: Carros) {
    this.formCarros.get('marca')?.patchValue(evento.marca)
    this.formCarros.get('modelo')?.patchValue(evento.modelo)
    this.formCarros.get('ano')?.patchValue(evento.ano)
    this.formCarros.get('textoAnuncio')?.patchValue(evento.textoAnuncio)
    this.formCarros.get('complementoAnuncio')?.patchValue(evento.complementoAnuncio)
    this.formCarros.get('quilometragem')?.patchValue(evento.quilometragem)
    this.formCarros.get('cambio')?.patchValue(evento.cambio)
    this.formCarros.get('cor')?.patchValue(evento.cor)
    this.formCarros.get('combustivel')?.patchValue(evento.combustivel)
    this.formCarros.get('categoria')?.patchValue(evento.categoria)
    this.formCarros.get('motor')?.patchValue(evento.motor)
    this.formCarros.get('portas')?.patchValue(evento.portas)
    this.formCarros.get('finalPlaca')?.patchValue(evento.finalPlaca)
    this.formCarros.get('acessorios')?.patchValue(evento.acessorios)
    this.formCarros.get('compra')?.patchValue(evento.valores.compra)
    this.formCarros.get('parcelasMaximas')?.patchValue(evento.valores.parcelasMaximas)
    this.formCarros.get('jurosMensais')?.patchValue(evento.valores.jurosMensais)
    this.formCarros.get('aluguelDia')?.patchValue(evento.valores.aluguelDia)
    this.formCarros.get('aluguelMes')?.patchValue(evento.valores.aluguelMes)
    this.formCarros.get('imagem1')?.patchValue(evento.imagens)
    this.formCarros.get('imagem2')?.patchValue(evento.imagens)
    this.formCarros.get('imagem3')?.patchValue(evento.imagens)
  }

  editarConteCarros() {
    let car: Carros = {
      id: this.formCarros.value.id,
      marca: this.formCarros.value.marca,
      modelo: this.formCarros.value.modelo,
      ano: this.formCarros.value.ano,
      textoAnuncio: this.formCarros.value.textoAnuncio,
      complementoAnuncio: this.formCarros.value.complementoAnuncio,
      quilometragem: this.formCarros.value.quilometragem,
      cambio: this.formCarros.value.cambio,
      cor: this.formCarros.value.cor,
      combustivel: this.formCarros.value.combustivel,
      categoria: this.formCarros.value.categoria,
      motor: this.formCarros.value.motor,
      portas: this.formCarros.value.portas,
      finalPlaca: this.formCarros.value.finalPlaca,
      acessorios: [this.formCarros.value.acessorios,],
      valores: {
        compra: this.formCarros.value.compra,
        parcelasMaximas: this.formCarros.value.parcelasMaximas,
        jurosMensais: this.formCarros.value.jurosMensais,
        aluguelDia: this.formCarros.value.aluguelDia,
        aluguelMes: this.formCarros.value.aluguelMes,
      },
      imagens: [
        this.formCarros.value.imagem1,
        this.formCarros.value.imagem2,
        this.formCarros.value.imagem3
      ]
    }
    this.apiCms.putEditarCarro(car).subscribe((data) => {
      location.reload()
    })
  }

  editarModelo() {
    let mode: ModeloDeCarro = {
      id: this.formModelos.value.id,
      modelo: this.formModelos.value.modelo,
      imagem: this.formModelos.value.imagem
    }

    this.apiCms.putEditarModelo(mode).subscribe((data) => {
      location.reload
    })
  }

  editarMarca() {
    let mode: Marcas = {
      id: this.formMarcas.value.id,
      marca: this.formMarcas.value.marca,
      imagem: this.formMarcas.value.imagem
    }

    this.apiCms.putEditarMarca(mode).subscribe((data) => {
      location.reload
    })
  }

  editarUser() {
    let user: Usuarios = {
      id: this.formUsuarios.value.id,
      nomeCompleto: this.formUsuarios.value.nomeCompleto,
      username: this.formUsuarios.value.username,
      tipo: this.formUsuarios.value.tipo
    }
    this.apiCms.putEditarUsuario(user).subscribe((data) => {      
      let p: FazerLogin = {
        id: this.formUsuarios.value.id,
        username: this.formUsuarios.value.username,
        senha: this.formUsuarios.value.senha,
        idUsuario: this.formUsuarios.value.idUsuario
      }
      this.apiCms.putEditarLogin(p).subscribe((data) => {
        location.reload
      })
    })
  }



  getCar(id: number): void {
    this.apiCms.getCarrosPorId(id).subscribe((data) => {
      this.car = data
      this.onEditCarro(this.car)
    })
  }

  getModelos(id: number): void {
    this.apiCms.getModelosPorId(id).subscribe((data) => {
      this.modelos = data
    })
  }

  getMarca(id: number): void {
    this.apiCms.getMarcasPorId(id).subscribe((data) => {
      this.marca = data
    })
  }

  getUsers(id: number): void {
    this.apiCms.getUsuariosPorId(id).subscribe((data) => {
      this.usuario = data
      this.apiCms.getFazerLoginPorId(id).subscribe((data) => {
        this.fazLogin = data
      })
    })
  }


}


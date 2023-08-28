import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Carros } from 'src/app/model/carros';
import { Coluna } from 'src/app/model/coluna';
import { ConteudoSite } from 'src/app/model/conteudo-site';
import { FazerLogin } from 'src/app/model/fazer-login';
import { Marcas } from 'src/app/model/marcas';
import { ModeloDeCarro } from 'src/app/model/modelo-de-carro';
import { Usuarios } from 'src/app/model/usuarios';
import { CmsService } from 'src/app/service/cms/cms.service';

@Component({
  selector: 'app-cmsHome',
  templateUrl: './cmsHome.component.html',
  styleUrls: ['./cmsHome.component.scss']
})
export class Tabela1Component implements OnInit {



  carros: Carros[] = [];
  modelosDeCarros: ModeloDeCarro[] = [];
  marcas: Marcas[] = [];
  conteudoSite: ConteudoSite = new ConteudoSite
  usuarios: Usuarios[] = [];
  fazerLogin: FazerLogin[] = [];


  openModalCar: boolean = false;
  openModalModelo: boolean = false;
  openModalMarca: boolean = false;
  openModalUser: boolean = false;
  openModalConteudoSite: boolean = false;
  openModalDelete: boolean = false;
  openModalAdd: boolean = false;


  car: Carros = new Carros;
  modelos: ModeloDeCarro = new ModeloDeCarro;
  marca: Marcas = new Marcas;
  usuario: Usuarios = new Usuarios;
  fazLogin: FazerLogin = new FazerLogin;
  conteSite: ConteudoSite = new ConteudoSite;


  editarConteudoSite: ConteudoSite = new ConteudoSite

  formConteudoSite: FormGroup;
  idDaUrl: number = 0;
  idDelete: number = 0;

  colsCarros: Coluna[] = [
    {
      descricao: "ID",
      name: "id",
      type: "texto"
    },
    {
      descricao: "MARCA",
      name: "marca",
      type: "number"
    },
    {
      descricao: "MODELO",
      name: "modelo",
      type: "number"
    },
    {
      descricao: "ANO",
      name: "ano",
      type: "texto"
    },
    {
      descricao: "QUILOMETRAGEM",
      name: "quilometragem",
      type: "texto"
    },
    {
      descricao: "COR",
      name: "cor",
      type: "texto"
    },
    {
      descricao: "CATEGORIA",
      name: "categoria",
      type: "texto"
    },
    {
      descricao: "MOTOR",
      name: "motor",
      type: "texto"
    }
  ]

  colsModelos: Coluna[] = [
    {
      descricao: "ID",
      name: "id",
      type: "texto"
    },
    {
      descricao: "MODELO",
      name: "modelo",
      type: "texto"
    },
    {
      descricao: "IMAGEM",
      name: "imagem",
      type: "imagem"
    }
  ]

  colsMarcas: Coluna[] = [
    {
      descricao: "ID",
      name: "id",
      type: "texto"
    },
    {
      descricao: "MARCA",
      name: "marca",
      type: "texto"
    },
    {
      descricao: "IMAGEM",
      name: "imagem",
      type: "imagem"
    }
  ]

  colsUsuarios: Coluna[] = [
    {
      descricao: "ID",
      name: "id",
      type: "texto"
    },
    {
      descricao: "NOME COMPLETO",
      name: "nomeCompleto",
      type: "texto"
    },
    {
      descricao: "USERNAME",
      name: "username",
      type: "texto"
    },
    {
      descricao: "TIPO",
      name: "tipo",
      type: "texto"
    }
  ]

  constructor(
    private rotaAtiva: ActivatedRoute,
    public router: Router,
    private apiCms: CmsService
  ) {
    this.formConteudoSite = new FormGroup({
      textoMarca: new FormControl('', [Validators.required]),
      textoModelo: new FormControl('', [Validators.required]),
      sugestao: new FormControl('', [Validators.required])
    })
  }


  ngOnInit(): void {
    this.rotaAtiva.snapshot.params['id']
    this.getInfosCar()
    this.getInfosUser()
    this.getConteudoSite()
    this.getInfosModalCar(this.idDaUrl)
    this.getInfosModalModelo(this.idDaUrl)
    this.getInfosModalMarca(this.idDaUrl)
    this.getInfosModalUsuarios(this.idDaUrl)
    this.getCar(this.idDaUrl)
    this.getModelos(this.idDaUrl)
    this.getMarca(this.idDaUrl)
    this.getUsers(this.idDaUrl)

  }



  getInfosCar(): void {
    this.apiCms.getAllCarros().subscribe({
      next: (data) => {
        this.carros = data
        this.apiCms.getAllMarcas().subscribe({
          next: (resp) => {
            this.marcas = resp
            for (let i = 0; i < this.carros.length; i++) {
              this.carros.forEach(carro => {
                const findMarca = this.marcas.find(marca => marca.id === carro.marca);
                if (findMarca) {
                  carro.marca = findMarca.marca
                }
              })
            }
            this.apiCms.getAllModelos().subscribe({
              next: (data) => {
                this.modelosDeCarros = data
                for (let i = 0; i < this.carros.length; i++) {
                  this.carros.forEach(carro => {
                    const findModelo = this.modelosDeCarros.find(modelo => modelo.id === carro.modelo);
                    if (findModelo) {
                      carro.modelo = findModelo.modelo
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  }

  getInfosUser(): void {
    this.apiCms.getAllUsuarioscadastro().subscribe({
      next: (data) => {
        this.usuarios = data
        this.apiCms.getAllUsernames().subscribe({
          next: (resp) => {
            this.fazerLogin = resp
          }
        })
      }
    })
  }

  getInfosModelo(): void{
    this.apiCms.getAllModelos().subscribe({
      next: (data) => {
        this.modelosDeCarros = data
      }
    })
  }

  getInfosMarcas(): void{
    this.apiCms.getAllMarcas().subscribe({
      next: (data) => {
        this.marcas = data
      }
    })
  }

  getConteudoSite(): void {
    this.apiCms.getAllConteudo().subscribe((data) => {
      this.conteudoSite = data
      this.editarConteudo(this.conteudoSite)
    })
  }


  getValue(name: string, row: any): any {
    return row[name]
  }

  getInfosModalCar(id: number) {
    this.apiCms.getCarrosPorId(id).subscribe((data) => {
      this.car = data
      this.openModalCar = true
    })
  }

  getInfosModalModelo(id: number) {
    this.apiCms.getModelosPorId(id).subscribe((data) => {
      this.modelos = data
      this.openModalModelo = true
    })
  }
  getInfosModalMarca(id: number) {
    this.apiCms.getMarcasPorId(id).subscribe((data) => {
      this.marca = data
      this.openModalMarca = true
    })
  }

  getInfosModalUsuarios(id: number) {
    this.apiCms.getUsuariosPorId(id).subscribe((data) => {
      this.usuario = data
      this.apiCms.getFazerLoginPorId(id).subscribe((resp) => {
        this.fazLogin = resp
        this.openModalUser = true
      })
    })
  }

  deletarCarro(evento: number) {
    this.openModalDelete = true
    this.idDelete = evento
  }

  deletarMarca(evento: number) {
    this.openModalDelete = true
    this.idDelete = evento   
  }

  deletarModelo(evento: number) {
    this.openModalDelete = true
    this.idDelete = evento
  }

  deletarUsuario(evento: number) {
    this.openModalDelete = true
    this.idDelete = evento
  }

  modalDelete(id: number) {
    if (this.router.url.includes('cms/table/carros')) {
      this.apiCms.deletarCarros(this.idDelete).subscribe((data) => {
        alert('Carro deletado')
      })
    } if (this.router.url.includes('cms/table/modelosDeCarros')) {
      this.apiCms.deletarModelo(this.idDelete).subscribe((data) => {
        alert('modelo deletado')
      })
    } if (this.router.url.includes('cms/table/marcas')) {
      this.apiCms.deletarMarca(this.idDelete).subscribe((data) => {
        alert('marca deletada')
      })
    } if (this.router.url.includes('cms/table/usuarios')) {
      this.apiCms.deletarUsuario(this.idDelete).subscribe((data) => {
        this.apiCms.deletarFazerLogin(this.idDelete).subscribe((data) => {
          alert('usuario deletado')
        })
      })
    }
    
    location.reload()

    this.openModalDelete = false

  }


  closeModalDelete() {
    this.openModalDelete = false
  }

  closeModalCar() {
    this.openModalCar = false
  }
  closeModalModelo() {
    this.openModalModelo = false
  }
  closeModalMarca() {
    this.openModalMarca = false
  }
  closeModalUser() {
    this.openModalUser = false
  }
  closeModalConteudoSite() {
    this.openModalConteudoSite = false
  }

  formateValor(valor: number): string {
    let opcoes = {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };
    return valor.toLocaleString('pt-BR', opcoes)
  }

  nameMarca(id: number): string {
    for (let marck of this.marcas) {
      if (marck.id == id) {
        return marck.marca
      }
    }
    return ""
  }

  nameModelo(id: number): string {
    for (let mode of this.modelosDeCarros) {
      if (mode.id == id) {
        return mode.modelo
      }
    }
    return ""
  }

  editarConteudo(evento: ConteudoSite) {

    this.formConteudoSite.get('textoMarca')?.patchValue(evento.home.textoMarca)
    this.formConteudoSite.get('textoModelo')?.patchValue(evento.home.textoModelo)
    this.formConteudoSite.get('sugestao')?.patchValue(evento.internaProduto.sugestao)

    

  }

  editarConteSite() {
    let conte: ConteudoSite = {
      home: {
        textoMarca: this.formConteudoSite.value.textoMarca,
      textoModelo: this.formConteudoSite.value.textoModelo
      },
      internaProduto: {
        sugestao: this.formConteudoSite.value.sugestao

      }      
    }
    this.apiCms.putEditarConteudo(conte).subscribe((data) => {
      location.reload()
    })
  }

 getCar(id: number): void{
  this.apiCms.getCarrosPorId(id).subscribe((data) => {
    this.car = data
  })
 }

 getModelos(id: number): void{
  this.apiCms.getModelosPorId(id).subscribe((data) => {
    this.modelos = data
  })
 }

 getMarca(id: number): void{
  this.apiCms.getMarcasPorId(id).subscribe((data) => {
    this.marca = data
  })
 }

 getUsers(id: number): void{
  this.apiCms.getUsuariosPorId(id).subscribe((data) => {
    this.usuario = data
    this.apiCms.getFazerLoginPorId(id).subscribe((data) => {
      this.fazLogin = data
    })
  })
 }

 










}

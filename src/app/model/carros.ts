import { Valores } from "./valores"

export class Carros {
  public id: number
  public marca: number
  public modelo: number
  public ano: number
  public textoAnuncio: string
  public complementoAnuncio: string
  public quilometragem: number
  public cambio: string
  public cor: string
  public combustivel: string
  public categoria: string
  public motor: number
  public portas: number
  public finalPlaca: number
  public acessorios: string[]
  public valores: {
    compra: number,
    parcelasMaximas: number,
    jurosMensais: number,
    aluguelDia: number,
    aluguelMes: number
  }
  public imagens: string[]



  constructor() {

    this.id = 0,
      this.marca = 0,
      this.modelo = 0,
      this.ano = 0,
      this.textoAnuncio = '',
      this.complementoAnuncio = '',
      this.quilometragem = 0,
      this.cambio = '',
      this.cor = '',
      this.combustivel = '',
      this.categoria = '',
      this.motor = 0,
      this.portas = 0,
      this.finalPlaca = 0,
      this.acessorios = [],
      this.valores = {
        compra: 0,
        parcelasMaximas: 0,
        jurosMensais: 0,
        aluguelDia: 0,
        aluguelMes: 0
      },
      this.imagens = []

  }
}



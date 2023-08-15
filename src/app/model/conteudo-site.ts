export class ConteudoSite {

  public home: {
    textoMarca: string,
    textoModelo: string
  }
  public internaProduto: {
    sugestao: string
  }



  constructor() {
    this.home = {
      textoMarca: '',
      textoModelo: ''
    },
      this.internaProduto = {
        sugestao: ''
      }
  }

}

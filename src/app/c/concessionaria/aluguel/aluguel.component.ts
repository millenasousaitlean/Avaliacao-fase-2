import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Marcas } from 'src/app/model/marcas';
import { Carros } from 'src/app/model/carros';
import { ModeloDeCarro } from 'src/app/model/modelo-de-carro';
import { CarrosService } from 'src/app/service/concessionaria/carros.service';
import { ArraysModal } from 'src/app/model/arrays-modal';
import { ConteudoSite } from 'src/app/model/conteudo-site';

@Component({
  selector: 'app-aluguel',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.scss']
})
export class AluguelComponent implements OnInit {

  marcas: Marcas[] = [];
  carros: Carros[] = [];
  modelo: ModeloDeCarro[] = [];
  carrosRand: Carros[] = [];
  titulos: ConteudoSite = new ConteudoSite()

  idDaUrl: number = 0;
  aluguelCarro: boolean = false
  openModal: boolean = false



  // MODAL COMPRA
  juros: number = 0
  qtdParcelas: number = 0;
  valorTotalCarro: number = 0;
  valorCarroComJuros: number[] = []
  valorDaParcela: number[] = []
  novaQtdParcelas: string = ''

  valorVeiculoComJuros: number[] = []
  parcelasVariavel: number[] = [];
  selectParcelas: number[] = []
  arraysModal: ArraysModal[] = [];


  // MODAL ALUGUEL

  aluguelDia: number = 0;
  aluguelMes: number = 0;
  qtdDias: string = '';
  valorAluguelDia: number = 0;
  valorAluguelMes: number = 0;

  car: Carros = {
    id: 0,
    marca: 0,
    modelo: 0,
    ano: 0,
    textoAnuncio: '',
    complementoAnuncio: '',
    quilometragem: 0,
    cambio: '',
    cor: '',
    combustivel: '',
    categoria: '',
    motor: 0,
    portas: 0,
    finalPlaca: 0,
    acessorios: [],
    valores: {
      compra: 0,
      parcelasMaximas: 0,
      jurosMensais: 0,
      aluguelDia: 0,
      aluguelMes: 0
    },
    imagens: [],
  }

  constructor(
    public router: Router,
    private rotaAtiva: ActivatedRoute,
    private apiCarros: CarrosService
  ) {
  }

  ngOnInit(): void {
    this.idDaUrl = this.rotaAtiva.snapshot.params['id']
    this.pegarInfosCarros();
    this.sorteCarros();
    this.pegarMarcas();
    this.pegarModelos();
    this.pegarConteudoSite()
    this.valorParcela();
    this.getsInfosAluguel()
  }


  pegarInfosCarros(): void {
    this.apiCarros.getAllCarros().subscribe({
      next: (resp) => {
        this.carros = resp
      }, error: (erro) => {
        console.log(erro)
      }
    })
  }
  pegarMarcas(): void {
    this.apiCarros.getAllMarcas().subscribe({
      next: (resp) => {
        this.marcas = resp
      }
    })
  }
  pegarModelos(): void {
    this.apiCarros.getAllModelos().subscribe({
      next: (resp) => {
        this.modelo = resp
      }
    })
  }
  pegarConteudoSite(): void {
    this.apiCarros.getAllConteudo().subscribe({
      next: (resp) => {
        this.titulos = resp
      }, error: (erro) => {
        console.log(erro)
      }
    })
  }

  findMarca(id: number): string {
    for (let d of this.marcas) {
      if (d.id == id) {
        return d.marca
      }
    }
    return ''
  }
  findModelo(id: number): string {
    for (let f of this.modelo) {
      if (f.id == id) {
        return f.modelo
      }
    }
    return ''
  }

  sorteCarros(): void {
    this.apiCarros.getAllCarros().subscribe((data) => {
      let carrosAleatorios: Carros[] = []
      this.carrosRand = []
      carrosAleatorios = data
      for (let i = 0; i <= 3; i++) {
        let n = Math.floor(Math.random() * carrosAleatorios.length )
        let rec = carrosAleatorios.splice(n, 1)[0]
        if (rec.id == this.car.id ){
          n = Math.floor(Math.random() * carrosAleatorios.length)
          rec = carrosAleatorios.splice(n, 1)[0]
        }     
          this.carrosRand.push(rec)       
      }
    })
  }

  mudarCarro(id: number) {
    setTimeout(() => {
      window.location.reload()
    }, 600)
    scrollTo({ top: 0, behavior: 'smooth' })
  }

  // MODAL



  abrirModal(): boolean {
    const usuario = JSON.parse(localStorage.getItem('user') as string)
    if(usuario){
      this.apiCarros.getCarrosPorId(this.idDaUrl).subscribe({
      next: (data) => {
        this.car = data
        if (this.car.valores.aluguelMes == 0 && this.car.valores.compra > 1) {
          this.compraModal()
        } if (this.car.valores.compra == 0 && this.car.valores.aluguelMes > 1) {
          this.aluguelModal()
        } if (this.car.valores.compra > 1 && this.car.valores.aluguelMes > 1) {
          this.compraModal()
        } else if (this.car.valores.compra == 0 && this.car.valores.aluguelMes == 0) {
          alert('Produto Indisponivel')
        }
      }
    })
    return true
    } else{
      this.openModal = true
      return false
    }
  }



  closeModal(): void {
    this.router.navigate([`concessionaria/page/aluguel/${this.idDaUrl}`])
  }
  closeModalLogin(): void{
    this.openModal = false
  }

  aluguelModal() {
    this.router.navigate([`concessionaria/page/aluguel/modal/aluguel/${this.idDaUrl}`])
  }

  compraModal() {
    this.router.navigate([`concessionaria/page/aluguel/modal/compra/${this.idDaUrl}`])
  }

  loginModal(){
    this.router.navigate([`concessionaria/page/login`])
  }

  // MODAL COMPRA 

  valorParcela() {
    this.apiCarros.getCarrosPorId(this.idDaUrl).subscribe((data) => {
      this.valorTotalCarro = data.valores.compra
      this.apiCarros.getCarrosPorId(this.idDaUrl).subscribe((data) => {
        this.qtdParcelas = data.valores.parcelasMaximas
        for (let i = 1; i <= this.qtdParcelas; i++) {
          this.selectParcelas.push(i);
        }
      })
    })
  }

  veiculoComJuros: number = 0
  totalJuros: number[] = []

  pegarInfosTabela(evalue: Event): void {
    this.parcelasVariavel = []
    this.valorCarroComJuros = []
    this.valorDaParcela = []
    this.apiCarros.getCarrosPorId(this.idDaUrl).subscribe((data) => {
      this.juros = data.valores.jurosMensais
      this.novaQtdParcelas = (evalue.target as HTMLSelectElement).value;
      this.qtdParcelas = +this.novaQtdParcelas

      for (let i = 1; i <= +this.novaQtdParcelas; i++) {

        // quantidade de parcelas que vem do select
        this.parcelasVariavel.push(i)

        // calculo valor do veiculo com juros
        let j = this.juros * this.parcelasVariavel.length             
        this.veiculoComJuros = j * this.valorTotalCarro
        this.valorCarroComJuros.push(this.veiculoComJuros)


        // valor variavel da parcela
        let parce = this.veiculoComJuros / this.parcelasVariavel.length
        this.valorDaParcela.push(parce)

      }     
      // array de arrays para ser usado no ngFor
      this.arraysModal = [{
        valorCarroComJuros: this.valorCarroComJuros,
        parcelasVariavel: this.parcelasVariavel,
        valorDaParcela: this.valorDaParcela
      }]
      this.selectParcelas = []
    })
    this.valorParcela()    
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

  // MODAL ALUGUEL

  getsInfosAluguel() {
    this.apiCarros.getCarrosPorId(this.idDaUrl).subscribe((data) => {
      this.aluguelDia = data.valores.aluguelDia
      this.apiCarros.getCarrosPorId(this.idDaUrl).subscribe((resp) => {
        this.aluguelMes = resp.valores.aluguelMes
      })
    })
  }
  infosAlugueis(evalue: Event): void {
    // this.valorAluguelDia.splice(0, this.valorAluguelDia)
    this.qtdDias = (evalue.target as HTMLSelectElement).value;

    if (+this.qtdDias <= 30) {
      this.valorAluguelDia = this.aluguelDia * +this.qtdDias
    } if (+this.qtdDias > 30) {
      let p = this.aluguelMes / 30
      this.valorAluguelMes = p * +this.qtdDias
    }
    this.getsInfosAluguel()
  }






}

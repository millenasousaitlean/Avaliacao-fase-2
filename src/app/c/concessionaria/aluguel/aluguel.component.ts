import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Marcas } from 'src/app/model/marcas';
import { Carros } from 'src/app/model/carros';
import { ModeloDeCarro } from 'src/app/model/modelo-de-carro';
import { CarrosService } from 'src/app/service/concessionaria/carros.service';
import { ArraysModal } from 'src/app/model/arrays-modal';

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

  idDaUrl: number = 0;
  openModal = false;
  modalCompra = false

  // MODAL COMPRA
  juros: number = 0
  qtdParcelas: number = 0;
  valorTotalCompra: number = 0;
  valorComJuros: number = 0
  valorDaParcela: number = 0
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
      for (let i = 0; i < 4; i++) {
        let n = Math.floor(Math.random() * carrosAleatorios.length)
        let rec = carrosAleatorios.splice(n, 1)[0]
        if (rec.id == this.car.id) {
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


  abrirModal(): void {
    this.openModal = true
    this.compraModal()
  }

  closeModal(): void {
    this.openModal = false
  }

  aluguelModal() {
    this.modalCompra = true

  }

  compraModal() {
    this.modalCompra = false
  }

  






  // MODAL COMPRA 

  valorParcela() {
    this.apiCarros.getCarrosPorId(this.idDaUrl).subscribe((data) => {
      this.valorTotalCompra = data.valores.compra
      this.apiCarros.getCarrosPorId(this.idDaUrl).subscribe((data) => {
        this.qtdParcelas = data.valores.parcelasMaximas
        for (let i = 1; i <= this.qtdParcelas; i++) {
          this.selectParcelas.push(i);
        }
      })
    })
  }
  pegarInfosTabela(evalue: Event): void {
    this.parcelasVariavel = []
    this.valorVeiculoComJuros = []
    this.apiCarros.getCarrosPorId(this.idDaUrl).subscribe((data) => {
      this.juros = data.valores.jurosMensais
      this.novaQtdParcelas = (evalue.target as HTMLSelectElement).value;
      this.qtdParcelas = +this.novaQtdParcelas

      for (let i = 1; i <= +this.novaQtdParcelas; i++) {

        // quantidade de parcelas que vem do select
        this.parcelasVariavel.push(i)

        // calculo valor do veiculo com juros
        let f = this.juros / 100
        let jurosDoVeiculo = f * this.valorTotalCompra
        this.valorComJuros = this.valorTotalCompra + jurosDoVeiculo
        this.valorVeiculoComJuros.push(this.valorComJuros)

        // valor variavel da parcela
        this.valorDaParcela = this.valorComJuros / this.parcelasVariavel.length

      }
      // array de arrays para ser usado no ngFor
      this.arraysModal = [{
        valorVeiculoComJuros: this.valorVeiculoComJuros,
        parcelasVariavel: this.parcelasVariavel
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

    console.log('valor dia', this.valorAluguelDia)
    console.log('valor mes', this.valorAluguelMes)
    this.getsInfosAluguel()
  }






}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './c/concessionaria/home/home.component';
import { InternaComponent } from './c/concessionaria/interna/interna.component';
import { AluguelComponent } from './c/concessionaria/aluguel/aluguel.component';
import { LoginComponent } from './c/concessionaria/login/login.component';
import { SingUpComponent } from './c/concessionaria/sing-up/sing-up.component';
import { Tabela1Component } from './c/cms/tabela1/tabela1.component';
import { EdicaoComponent } from './c/cms/edicao/edicao.component';
import { LoginAdmComponent } from './c/cms/login-adm/login-adm.component';

const routes: Routes = [
  {path: 'concessionaria/page/home', component: HomeComponent},
  {path: 'concessionaria/page/interna/marcas/:id', component: InternaComponent},
  {path: 'concessionaria/page/interna/modelos/:id', component: InternaComponent},
  {path: 'concessionaria/page/aluguel/:id', component: AluguelComponent},
  {path: 'concessionaria/page/login', component: LoginComponent},
  {path: 'concessionaria/page/singUp', component: SingUpComponent},
  {path: 'page/loginAdm', component: LoginAdmComponent},
  {path: 'cms/table1', component: Tabela1Component },
  {path: 'cms/edicao', component: EdicaoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

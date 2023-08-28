import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './c/concessionaria/home/home.component';
import { InternaComponent } from './c/concessionaria/interna/interna.component';
import { AluguelComponent } from './c/concessionaria/aluguel/aluguel.component';
import { LoginComponent } from './c/concessionaria/login/login.component';
import { SingUpComponent } from './c/concessionaria/sing-up/sing-up.component';
import { Tabela1Component } from './c/cms/cms-Home/cmsHome.component';
import { LoginAdmComponent } from './c/cms/login-adm/login-adm.component';
import { AuthGuard } from './auth.guard';
import { AddInfoComponent } from './c/cms/add-info/add-info.component';

const routes: Routes = [
  {path: 'concessionaria/page/home', component: HomeComponent},
  {path: 'concessionaria/page/interna/marcas/:id', component: InternaComponent},
  {path: 'concessionaria/page/interna/modelos/:id', component: InternaComponent},
  {path: 'concessionaria/page/aluguel/:id', component: AluguelComponent},
  {path: 'concessionaria/page/aluguel/modal/compra/:id', component: AluguelComponent, canActivate: [AuthGuard]},
  {path: 'concessionaria/page/aluguel/modal/aluguel/:id', component: AluguelComponent, canActivate: [AuthGuard]},
  {path: 'concessionaria/page/login', component: LoginComponent},
  {path: 'concessionaria/page/singUp', component: SingUpComponent},
  {path: 'page/loginAdm', component: LoginAdmComponent},
  {path: 'cms/table/carros', component: Tabela1Component, canActivate: [AuthGuard]},
  {path: 'cms/table/marcas', component: Tabela1Component, canActivate: [AuthGuard]},
  {path: 'cms/table/modelosDeCarros', component: Tabela1Component, canActivate: [AuthGuard]},
  {path: 'cms/table/usuarios', component: Tabela1Component, canActivate: [AuthGuard]},
  {path: 'cms/table/conteudoSite', component: Tabela1Component, canActivate: [AuthGuard]},
  {path: 'cms/table/new/carros/0', component: AddInfoComponent, canActivate: [AuthGuard]},
  {path: 'cms/table/new/marcas/0', component: AddInfoComponent, canActivate: [AuthGuard]},
  {path: 'cms/table/new/modelosDeCarros/0', component: AddInfoComponent, canActivate: [AuthGuard]},
  {path: 'cms/table/new/usuarios/0', component: AddInfoComponent, canActivate: [AuthGuard]},  
  {path: 'cms/table/new/carros/:id', component: AddInfoComponent, canActivate: [AuthGuard]},
  {path: 'cms/table/new/marcas/:id', component: AddInfoComponent, canActivate: [AuthGuard]},
  {path: 'cms/table/new/modelosDeCarros/:id', component: AddInfoComponent, canActivate: [AuthGuard]},
  {path: 'cms/table/new/usuarios/:id', component: AddInfoComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

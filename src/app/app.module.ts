import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './c/concessionaria/home/home.component';
import { InternaComponent } from './c/concessionaria/interna/interna.component';
import { AluguelComponent } from './c/concessionaria/aluguel/aluguel.component';
import { LoginComponent } from './c/concessionaria/login/login.component';
import { SingUpComponent } from './c/concessionaria/sing-up/sing-up.component';
import { Tabela1Component } from './c/cms/tabela1/tabela1.component';
import { EdicaoComponent } from './c/cms/edicao/edicao.component';
import { FooterComponent } from './c/shared/footer/footer.component';
import { NavBarComponent } from './c/shared/nav-bar/nav-bar.component';
import { NavLateralComponent } from './c/shared/nav-lateral/nav-lateral.component';
import { TabelaComponent } from './c/shared/tabela/tabela.component';
import { ButtonsComponent } from './c/shared/buttons/buttons.component';
import { TitulosComponent } from './c/shared/titulos/titulos.component';
import { CardComponent } from './c/shared/card/card.component';
import { LoginAdmComponent } from './c/cms/login-adm/login-adm.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InternaComponent,
    AluguelComponent,
    LoginComponent,
    SingUpComponent,
    Tabela1Component,
    EdicaoComponent,
    FooterComponent,
    NavBarComponent,
    NavLateralComponent,
    TabelaComponent,
    ButtonsComponent,
    TitulosComponent,
    CardComponent,
    LoginAdmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

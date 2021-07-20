import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { PrincipalComponent } from './principal/principal/principal.component';

import { AuthGuard } from "./guards/auth.guard";
import { DocumentosComponent } from './principal/documentos/documentos.component';
import { MensajeComponent } from './principal/mensaje/mensaje.component';

const routes: Routes = [
  {path:'principal',component:PrincipalComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'docs',component:DocumentosComponent},
  {path:'mensaje',component:MensajeComponent},


  {path: '**', pathMatch: 'full', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimuladorComponent } from './components/simulador/simulador.component';
import { AppViewComponent } from './views/app-view/app-view.component';
import { AsesorViewComponent } from './views/asesor-view/asesor-view.component';
import { BankViewComponent } from './views/bank-view/bank-view.component';
import { ConfigViewComponent } from './views/config-view/config-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { UserViewComponent } from './views/user-view/user-view.component';

const routes: Routes = [
  { path: '', component: LoginViewComponent },
  {
    path: 'home',
    component: AppViewComponent,
    children: [
      { path: 'bancos', component: BankViewComponent },
      { path: 'asesores', component: AsesorViewComponent },
      { path: 'configuracion', component: ConfigViewComponent },
      { path: 'user', component: UserViewComponent },
      { path: 'simulador', component: SimuladorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { WorkOrdersComponent } from './work-orders/work-orders.component';
import { ProblemsComponent } from './problems/problems.component';
import { EjemploComponent } from './ejemplo/ejemplo.component';
import { ServiceComponent } from './service/service.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },

      // Ruta protegida que usa el layout con la cabecera y menú lateral
  {
    path: '',
    component: LayoutComponent,
    children: [
    { path: 'home', component: HomeComponent },   
    { path: 'incidents', component: IncidentsComponent },
    { path: 'problems', component: ProblemsComponent },
    { path: 'work-orders', component: WorkOrdersComponent },
    { path: 'ejemplo', component: EjemploComponent },
    { path: 'service', component: ServiceComponent },
    { path: 'users', component: UsersComponent },
      // Otras rutas aquí
    ]
  },

   // Redirección si la ruta no se encuentra
  { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
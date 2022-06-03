import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultComponent } from '@layout/default/default.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './core/guards/login.guard';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { HistoryComponent } from './components/history/history.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SimulationResult } from './models/simulation-result';
import { SimulationResultComponent } from './components/simulation-result/simulation-result.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'simulator',
        component: SimulatorComponent
      },
      {
        path: 'simulation-result',
        component: SimulationResultComponent
      },
      {
        path: 'history',
        component: HistoryComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

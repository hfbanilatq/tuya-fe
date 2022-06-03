import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { SimulatorComponent } from './simulator/simulator.component';
import { HistoryComponent } from './history/history.component';
import { SimulationResultComponent } from './simulation-result/simulation-result.component';



@NgModule({
  declarations: [
    CreditCardComponent,
    ProductComponent,
    HomeComponent,
    LoginComponent,
    SimulatorComponent,
    HistoryComponent,
    SimulationResultComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ToastrModule.forRoot()
  ],
  exports: [
    CreditCardComponent,
    ProductComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }

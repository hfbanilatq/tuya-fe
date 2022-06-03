import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtService } from '@src/app/core/services/authentication/jwt.service';
import { CreditCardService } from '@src/app/core/services/credit-card.service';
import { SimulationService } from '@src/app/core/services/simulation.service';
import { CreditCard } from '@src/app/models/credit-card';
import { MonthlyFee } from '@src/app/models/monthly-fee';
import { Simulation } from '@src/app/models/simulation';
import { SimulationResult } from '@src/app/models/simulation-result';

@Component({
  selector: 'app-simulation-result',
  templateUrl: './simulation-result.component.html',
  styleUrls: ['./simulation-result.component.scss']
})
export class SimulationResultComponent implements OnInit, AfterViewInit {
  result: SimulationResult;
  simulation: Simulation;
  usedCreditCard: CreditCard;
  displayedColumns: string[] = ['feeNumber', 'feeValue', 'balance'];
  isLoggedIn = false;
  dataSource: MatTableDataSource<MonthlyFee> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private simulationService: SimulationService,
    private router: Router,
    private jwtService: JwtService,
    private creditCardService: CreditCardService
  ) {
    this.result = this.simulationService.simulationResult;
    if (this.result !== undefined) {
      this.dataSource = new MatTableDataSource(this.result.monthlyFees);
      this.simulation = this.simulationService.currentSimulation;
    } else {
      this.goToSimulator();
    }
  }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.jwtService.isLogged();

    if (this.simulation) {
      this.creditCardService.getCreditCarById(this.simulation.creditCardId).subscribe(card => this.usedCreditCard = card);
    }
  }

  save() {
    this.simulationService.save(this.simulation).subscribe(response => {
      this.simulation = response;
    });
  }

  goToSimulator() {
    this.router.navigate(['simulator']);
  }

}

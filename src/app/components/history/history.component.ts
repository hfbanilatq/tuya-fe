import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtService } from '@src/app/core/services/authentication/jwt.service';
import { SimulationService } from '@src/app/core/services/simulation.service';
import { Simulation } from '@src/app/models/simulation';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'creditCard', 'numberOfProducts', 'numberOfInstallments', 'createdAt', 'action'];
  dataSource: MatTableDataSource<Simulation> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private simulationService: SimulationService,
    private jwtService: JwtService,
    private router: Router) { }

  ngOnInit(): void {
    this.simulationService.getSimulations(this.jwtService.getAuthUserId()).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDetail(simulation: Simulation) {
    this.simulationService.simulate(simulation).subscribe(response => {
      this.simulationService.simulationResult = response;
      this.simulationService.currentSimulation = simulation;
      this.router.navigate(['simulation-result']);
    })
  }

}

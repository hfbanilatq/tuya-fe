import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@src/app/models/generic-response';
import { Simulation } from '@src/app/models/simulation';
import { SimulationResult } from '@src/app/models/simulation-result';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  apiUrl = environment.apiUrl;
  simulationResult: SimulationResult;
  currentSimulation: Simulation;

  constructor(
    private httpClient: HttpClient
  ) { }

  public simulate(simulation: Simulation): Observable<SimulationResult> {
    return this.httpClient.post<GenericResponse>(`${this.apiUrl}/simulation/simulate`, simulation).pipe(
      map(response => response.response as SimulationResult)
    );
  }

  public save(simulation: Simulation): Observable<Simulation> {
    return this.httpClient.post<GenericResponse>(`${this.apiUrl}/simulation/save`, simulation).pipe(
      map(response => response.response as Simulation)
    );
  }

  public getSimulations(userId: number): Observable<Simulation[]> {
    return this.httpClient.get<GenericResponse>(`${this.apiUrl}/simulation/list/${userId}`).pipe(
      map(response => response.response as Simulation[])
    );
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCard } from '@src/app/models/credit-card';
import { GenericResponse } from '@src/app/models/generic-response';
import { Product } from '@src/app/models/product';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { }


  public getCards(): Observable<CreditCard[]> {
    return this.httpClient.get<GenericResponse>(`${this.apiUrl}/credit-card/list`).pipe(
      map(response => response.response as CreditCard[])
    );
  }

  public getCreditCarById(id: number): Observable<CreditCard> {
    return this.httpClient.get<GenericResponse>(`${this.apiUrl}/credit-card/detail/${id}`).pipe(
      map(response => response.response as CreditCard)
    );
  }
}

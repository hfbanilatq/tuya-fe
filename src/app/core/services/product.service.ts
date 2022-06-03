import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@src/app/models/generic-response';
import { Product } from '@src/app/models/product';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<GenericResponse>(`${this.apiUrl}/product/list`).pipe(
      map(response => response.response as Product[])
    );
  }
}

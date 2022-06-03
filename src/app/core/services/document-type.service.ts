import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentType } from '@src/app/models/document-type';
import { GenericResponse } from '@src/app/models/generic-response';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  public getDocumentTypes(): Observable<DocumentType[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/document-type/list`).pipe(
      map(response => response as DocumentType[])
    );
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '@src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from './jwt.service';
import { Jwt } from '@src/app/models/jwt';
import { Login } from '@src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.apiUrl;
  public redirectUrl = null;

  constructor(private httpClient: HttpClient,
    private toastrService: ToastrService,
    private jwtService: JwtService) {
  }

  public login(login: Login): Observable<Jwt> {
    return this.httpClient.post<any>(`${this.apiUrl}/authentication/login`, login).pipe(
      map(res => res.response as Jwt),
      catchError((err) => {
        console.log("Error", err);
        this.toastrService.error(err.error.detail, 'Error de inicio de sesión', {
          closeButton: true, timeOut: 5000
        });
        return throwError(err);
      })
    );
  }

  public isLoggedIn(): boolean {
    return !!this.jwtService.getToken();
  }


  public getUsername(): string {
    return this.jwtService.getUsername();
  }

  public getToken(): string {
    return this.jwtService.getToken();
  }

  public logout(): void {
    this.jwtService.logout();
  }

  isAdmin(): boolean {
    return this.jwtService.isAdmin();
  }
  public refreshToken(token: string) {
    const jwt = new Jwt();
    jwt.token = token;
    return this.httpClient.post<any>(`${this.apiUrl}/authentication/refresh-token`, jwt).pipe(
      map(res => {
        return res.response as Jwt
      }),
      catchError(err => {
        this.toastrService.warning(err.error.detail, 'Error al refrescar token.');
        this.logout();
        return throwError(err);
      })
    );
  }
}

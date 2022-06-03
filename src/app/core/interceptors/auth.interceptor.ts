import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {LoginService} from '../services/authentication/login.service';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import { Jwt } from '@src/app/models/jwt';
import { JwtService } from '../services/authentication/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshTokenInProgress: boolean = false;
  refreshTokenSubject: BehaviorSubject<Jwt> = new BehaviorSubject<Jwt>(null);
  constructor(private loginService: LoginService,
    private jwtService: JwtService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();

    if (!this.loginService.isLoggedIn()) {
      return next.handle(request);
    }

    const headers = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(headers).pipe(catchError((err: HttpErrorResponse) => {
      if (err instanceof HttpErrorResponse && !headers.url.includes('login') && err.status === 401) {
        return this.handle401Error(token, headers, next);
      }
      return throwError(err);
    }));

  }

  private handle401Error(token: string, request: HttpRequest<any>, next: HttpHandler) {
    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject.pipe(
        filter(jwt => jwt !== null),
        take(1),
        switchMap(jwt => {
          request = this.addToken(request, jwt.token);
          return next.handle(request);
        })
      );
    } else {
      this.refreshTokenInProgress = true;
      
      this.refreshTokenSubject.next(null);

      return this.loginService.refreshToken(token).pipe(
        switchMap((res: Jwt) => {
          console.log('refreshing');
          this.jwtService.setToken(res.token);
          this.refreshTokenSubject.next(res);
          return next.handle(this.addToken(request, res.token));
        }),
        finalize(() => this.refreshTokenInProgress = false)
      );
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {

    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }

}

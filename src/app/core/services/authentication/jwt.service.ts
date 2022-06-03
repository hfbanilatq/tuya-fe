import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  roles: Array<string> = [];

  constructor(private router: Router) {
  }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }


  public getUsername(): string | null {
    if (!this.isLogged()) {
      return null;
    }
    const values = this.getValues();
    return values.username;
  }

  private getValues(): any {
    const payload = this.getToken()?.split('.')[1];
    const payloadDecoded = atob(payload);
    return JSON.parse(payloadDecoded);
  }

  public getAuthorities(): Array<string> | null {
    if (!this.isLogged()) {
      return null;
    }
    const values = this.getValues();
    return values.roles;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const values = this.getValues();
    const roles = values.roles;
    return roles.indexOf('ROLE_ADMIN') >= 0;
  }

  public getAuthUserId(): number {
    if (!this.isLogged()) {
      return null;
    }
    const values = this.getValues();
    return values.userId;
  }

  public logout(): void {
    window.localStorage.clear();
    this.router.navigate(['']);
  }

  public isLogged(): boolean {
    return !!this.getToken();
  }

}

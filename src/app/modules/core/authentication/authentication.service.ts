import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JsonWebToken } from '../types/JsonWebToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  static tokenStorageKey = 'apiAccessToken';
  static emailStorageKey = 'email';
  static nameStorageKey = 'name';
  static isAdminKey = 'access';

  constructor(private http: HttpClientModule) { }

  public get authenticated() {
    const token = this.token;

    if (token == null) {
      return false;
    }

    if (this.email == null) {
      return false;
    }

    const parsed = this.parseToken(token);
    const exp = new Date(parsed.exp * 1000);
    return exp > new Date();
  }

  public get token() {
    return localStorage.getItem(AuthenticationService.tokenStorageKey);
  }

  public get email() {
    return localStorage.getItem(AuthenticationService.emailStorageKey);
  }

  public get name() {
    return localStorage.getItem(AuthenticationService.nameStorageKey);
  }

  public get isAdmin() {
    return localStorage.getItem(AuthenticationService.isAdminKey);
  }

  public set token(value) {
    localStorage.setItem(AuthenticationService.tokenStorageKey, value);
  }

  public set email(value) {
    localStorage.setItem(AuthenticationService.emailStorageKey, value);
  }

  public set name(value) {
    localStorage.setItem(AuthenticationService.nameStorageKey, value);
  }

  public set isAdmin(value) {
    localStorage.setItem(AuthenticationService.isAdminKey, value);
  }

  public logoff = () => {
    localStorage.removeItem(AuthenticationService.tokenStorageKey);
    localStorage.removeItem(AuthenticationService.emailStorageKey);
    localStorage.removeItem(AuthenticationService.nameStorageKey);
    localStorage.removeItem(AuthenticationService.isAdminKey);
  }

  public parseToken = (token: string): JsonWebToken => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}

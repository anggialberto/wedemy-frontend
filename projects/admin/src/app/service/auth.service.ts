import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem('token', token)
  }

  getToken(): string {
    return localStorage.getItem('token')
  }

  clearToken(): void {
    localStorage.clear();
  }

  getUsername(): string {
    return localStorage.getItem('userName');
  }

  getRole(): string {
    return localStorage.getItem('roleCode');
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  getProfileId(): string {
    return localStorage.getItem('profileId');
  }

}

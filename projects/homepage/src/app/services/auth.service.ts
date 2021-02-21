import { Injectable } from '@angular/core';
import { Users } from '@bootcamp-homepage/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveProfile(val: any, user: Users): void {
    localStorage.setItem('userId', val.userId);
    localStorage.setItem('roleCode', val.roleCode);
    localStorage.setItem('userName', user.username);
    localStorage.setItem('profileId', val.profileId)
  }

  getToken(): string {
    return localStorage.getItem('token');
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

  clearToken(): void {
    localStorage.clear();
  }
}

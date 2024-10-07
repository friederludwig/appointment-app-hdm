import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // return true if token exists
  }
}

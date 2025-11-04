import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private mockUser = { username: 'admin', password: 'admin' };

  login(username: string, password: string): Observable<any> {
    if (username === this.mockUser.username && password === this.mockUser.password) {
      localStorage.setItem('user', JSON.stringify(this.mockUser));
      return of(this.mockUser);
    } else {
      return throwError(() => new Error('Credenciales inválidas'));
    }
  }

  register(data: any): Observable<any> {
    console.log('Simulación de registro:', data);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}

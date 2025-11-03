import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, LoginCredentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  currentUser = signal<User | null>(this.getUserFromStorage());

  constructor(private router: Router) {}

  login(credentials: LoginCredentials): boolean {
    const fakeToken = this.generateFakeJWT(credentials.email);
    const user: User = {
      id: '1',
      name: credentials.email.split('@')[0],
      email: credentials.email,
      avatar: 'https://cdn.pixabay.com/photo/2022/09/02/07/26/rick-sanchez-7426878_1280.jpg'
    };

    localStorage.setItem(this.TOKEN_KEY, fakeToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);

    return true;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private generateFakeJWT(email: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      email,
      exp: Date.now() + 3600000,
      iat: Date.now()
    }));
    const signature = btoa('fake-signature');
    return `${header}.${payload}.${signature}`;
  }
}

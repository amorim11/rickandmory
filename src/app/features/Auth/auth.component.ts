import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], 
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class LoginComponent {
 email = '';
  password = '';
  errorMessage = signal<string>('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.email && this.password) {
      const success = this.authService.login({ email: this.email, password: this.password });
      if (success) {
        this.router.navigate(['/characters']);
      } else {
        this.errorMessage.set('Invalid credentials');
      }
    }
  }
}
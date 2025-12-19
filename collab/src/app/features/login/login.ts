import { Component, inject, signal } from '@angular/core';
import { ILoginData } from '../../core/models/login.model';
import { email, Field, form, required } from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './services/login';

@Component({
  selector: 'app-login',
  imports: [Field],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);
  private loginService = inject(LoginService);
  public loginError = false;
  public loginSuccess = false;

  public loginModel = signal<ILoginData>({
    email: '',
    password: '',
  });

  public loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });

    required(schemaPath.password, { message: 'Password is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm().valid()) {
      const credentials = this.loginModel();

      this.loginService.getUsers().subscribe({
        next: (users) => {
          const user = users.find(
            (u) => u.email === credentials.email && u.password === credentials.password
          );

          if (user) {
            console.log('Login successful:', user);
            alert('Login successful!');
            this.loginSuccess = true;
            this.loginError = false;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['my-todos']);
          } else {
            alert('Invalid email or password!');
          }
        },
        error: (error) => {
          this.loginError = true;
          this.loginSuccess = false;
          localStorage.removeItem('isLoggedIn');
          console.error('Error during login:', error);
          alert('An error occurred during login');
        },
      });
    }
  }
}

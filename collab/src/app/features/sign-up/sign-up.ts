import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { Field, form, required, email, minLength, maxLength, min, max } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Register } from './services/register';

@Component({
  selector: 'app-sign-up',
  imports: [Field],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SignUp {
  private router = inject(Router);
  private registerService = inject(Register);

  public registerModel = signal<RegisterData>({
    id: 0,
    name: '',
    surname: '',
    age: 0,
    email: '',
    password: ''
  })

  public registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    minLength(schemaPath.name, 2, { message: 'Name must be at least 2 characters' });
    maxLength(schemaPath.name, 30, { message: 'Name must be max 30 characters' });

    required(schemaPath.surname, { message: 'Surname is required' });
    minLength(schemaPath.surname, 2, { message: 'Surname must be at least 2 characters' });
    maxLength(schemaPath.surname, 30, { message: 'Surname must be max 30 characters' });

    required(schemaPath.age, { message: 'Age is required' });
    min(schemaPath.age, 10, { message: 'Age must be at least 10' });
    max(schemaPath.age, 120, { message: 'Age must be max 120' });

    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });

    required(schemaPath.password, { message: 'Password is required' });
  })

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.registerForm().valid()) {
      const newUser = {
        ...this.registerModel(),
        id: Date.now() 
      };
      this.registerService.registerUser(newUser).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.registerModel.set({
            id: 0,
            name: '',
            surname: '',
            age: 0,
            email: '',
            password: ''
          });
          alert('Registration successful! Redirecting to login...');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
        }
      });
    }
  }
}

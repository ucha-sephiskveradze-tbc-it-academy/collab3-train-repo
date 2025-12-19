import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home-component/home-component';
import { AddTodo } from './features/add-todo/add-todo';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: 'todos',
    loadComponent: () => import('./features/add-todo/add-todo').then((m) => m.AddTodo),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./features/login/login').then((s) => s.Login),
  },
];

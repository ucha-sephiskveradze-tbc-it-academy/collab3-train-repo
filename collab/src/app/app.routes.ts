import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "signup",
        loadComponent: () => import('./features/sign-up/sign-up').then((m) => m.SignUp),
    },
    {
        path: "login",
        loadComponent: () => import('./features/login/login').then((m) => m.Login),
    }
];

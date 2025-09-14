import {Routes} from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login-page.component').then(m => m.LoginPageComponent),
        data: {breadcrumb: 'Login'},
    },
    {
        path: 'register',
        loadComponent: () => import('./register-page.component').then(m => m.RegisterPageComponent),
        data: {breadcrumb: 'Register'},
    },
    {
        path: 'forgot',
        loadComponent: () => import('./forgot-page.component').then(m => m.ForgotPageComponent),
        data: {breadcrumb: 'Forgot'},
    },
    {path: '', pathMatch: 'full', redirectTo: 'login'},
];

export default AUTH_ROUTES;

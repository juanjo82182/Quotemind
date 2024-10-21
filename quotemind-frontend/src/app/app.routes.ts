import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [publicGuard()],
        loadChildren: () => import('./auth/features/shell/auth.routes'),
    },
    {
        path: 'dashboard',
        canActivate: [privateGuard()],
        loadComponent: () => import('./dashboard/dashboard.component'),
    },
    {
        path: 'crud',
        canActivate: [privateGuard()],
        loadComponent: () => import('./crud/crud.component'),
    },
    {
        path: 'catalogo',
        canActivate: [privateGuard()],
        loadComponent: () => import('./catalogo/catalogo.component'),
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { HomeComponent } from './components/home/home.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'create-account',
        component: CreateAccountComponent
    },
    {
        path: 'login',
        component: LoginScreenComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);

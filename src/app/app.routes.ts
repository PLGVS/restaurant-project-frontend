import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MenuComponent } from './menu/menu.component';
import { DevPageComponent } from './dev-page/dev-page.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'reservation', component: ReservationComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'dev/login', component: LoginComponent },
    { path: 'dev', component: DevPageComponent }
];

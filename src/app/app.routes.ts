import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DishDetailComponent } from './pages/dish-detail/dish-detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [authGuard]
    },
    {
        path: 'dish/:id',
        component: DishDetailComponent,
        canActivate: [authGuard]
    },
    {
        path: '404',
        component: PageNotFoundComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: AuthenticationComponent,

    },
    {
        path: 'register',
        redirectTo: 'login'
    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [authGuard]
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: '',
        canActivate: [authGuard]
    },
];

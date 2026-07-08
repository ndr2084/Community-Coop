import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { Sell } from './pages/sell/sell';
import { Rent } from './pages/rent/rent';
import { UserShop } from './pages/user-shop/user-shop';
import { OrderHistory } from './pages/order-history/order-history';
import { Cart } from './pages/cart/cart';


export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'home',
    component: Home
  },

  {
    path: 'shop',
    component: Shop
  },

  {
    path: 'rent',
    component: Rent
  },

  {
    path: 'sell',
    component: Sell
  },

  {
    path: 'user-shop',
    component: UserShop
  },

  {
    path: 'order-history',
    component: OrderHistory
  },

  {
    path: 'cart',
    component: Cart
  },

];

import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { UserShop } from './pages/user-shop/user-shop';
import { OrderHistory } from './pages/order-history/order-history';
import { Cart } from './pages/cart/cart';
import { Watersports } from './pages/shop/sub-pages/watersports/watersports';
import { CanoesKayaks } from './pages/shop/sub-pages/watersports/canoes-kayaks/canoes-kayaks';
import { Climbing } from './pages/shop/sub-pages/climbing/climbing';
import { Crashpads } from './pages/shop/sub-pages/climbing/crashpads/crashpads';
import { Education } from './pages/shop/sub-pages/education/education';
import { Books } from './pages/shop/sub-pages/education/books/books';
import { Camping } from './pages/shop/sub-pages/camping/camping';
import { Tents } from './pages/shop/sub-pages/camping/tents/tents';


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
    component: Shop,
    children: [
      {
        path: 'watersports',
        component: Watersports,
        children: [
          {path: 'canoes-kayaks', component: CanoesKayaks},
        ],
      },

      {
        path: 'climbing',
        component: Climbing,
        children: [
          {path: 'crash-pads', component: Crashpads},
        ],
      },

      {
        path: 'education',
        component: Education,
        children: [
          {path: 'books', component: Books},
        ],
      },

      {
        path: 'camping',
        component: Camping,
        children: [
          {path: 'tents', component: Tents},
        ],
      }

    ]
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

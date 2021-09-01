import Shop from './pages/Shop';
import Auth from './pages/Auth';
import DevicePage from './pages/DevicePage';
import Basket from './pages/Basket';
import AdminDevices from './pages/AdminDevices';
import AdminBrands from './pages/AdminBrands';
import AdminTypes from './pages/AdminTypes';
import { ADMIN_BRANDS_ROUTE, ADMIN_DEVICES_ROUTE, ADMIN_TYPES_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/consts';

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        component: Shop
    },
    {
        path: LOGIN_ROUTE,
        component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        component: DevicePage
    }
];

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        component: Basket
    }
];

export const adminRoutes = [
    {
        path: ADMIN_DEVICES_ROUTE,
        component: AdminDevices
    },
    {
        path: ADMIN_BRANDS_ROUTE,
        component: AdminBrands
    },
    {
        path: ADMIN_TYPES_ROUTE,
        component: AdminTypes
    }
];
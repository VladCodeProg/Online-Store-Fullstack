import React from 'react';
import {AppBar, Toolbar, Container, Typography, Button} from '@material-ui/core';
import {AccountCircle, Apple, Devices, Edit, ExitToApp, LaptopChromebook, ShoppingCart} from '@material-ui/icons';
import { useStore } from '../index';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ADMIN_BRANDS_ROUTE, ADMIN_DEVICES_ROUTE, ADMIN_TYPES_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';

const Navbar = observer(() => {
    const {user} = useStore();
    const history = useHistory();
    const {pathname} = useLocation();
    const isAdminPage = pathname.includes('admin');

    const logOut = () => {
        localStorage.removeItem('token');
        user.setIsAuth(false);
        user.setUser({});
    }

    return (
        <AppBar style={{background: '#0C2D48'}} position="static">
            <Container>
                <Toolbar>
                    <div style={{flexGrow: 1}}>
                        <Typography
                            variant="h5"
                            style={{width: 140}}
                            // onClick={() => history.push(SHOP_ROUTE)}
                        >
                            <NavLink
                                to={SHOP_ROUTE}
                                style={{fontWeight: 'bold', textDecoration: 'none', color: '#fff'}}
                            >
                                Online Store
                            </NavLink>
                        </Typography>
                    </div>
                    {user.isAuthed ?
                        <>
                            {isAdminPage ?
                                <>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        style={{marginRight: 12}}
                                        startIcon={<Devices />}
                                        onClick={() => history.push(ADMIN_DEVICES_ROUTE)}
                                    >
                                        Управление устройствами
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        style={{marginRight: 12}}
                                        startIcon={<LaptopChromebook />}
                                        onClick={() => history.push(ADMIN_TYPES_ROUTE)}
                                    >
                                        Управление типами
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        startIcon={<Apple />}
                                        onClick={() => history.push(ADMIN_BRANDS_ROUTE)}
                                    >
                                        Управление брендами
                                    </Button>
                                </>
                                :
                                <>
                                    {user.user.role === 'ADMIN' &&
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            style={{marginRight: 12}}
                                            startIcon={<Edit />}
                                            onClick={() => history.push(ADMIN_DEVICES_ROUTE)}
                                        >
                                            Админ панель
                                        </Button>
                                    }
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        style={{marginRight: 12}}
                                        startIcon={<ShoppingCart />}
                                        onClick={() => history.push(BASKET_ROUTE)}
                                    >
                                        Корзина
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        startIcon={<ExitToApp />}
                                        onClick={logOut}
                                    >
                                        Выйти
                                    </Button>
                                </>
                            }
                        </>
                        :
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<AccountCircle />}
                            onClick={() => history.push(LOGIN_ROUTE)}
                        >
                            Войти
                        </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
});

export default Navbar
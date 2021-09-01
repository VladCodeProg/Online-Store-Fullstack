import React, { useState } from 'react';
import {Button, Container, TextField, Typography} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {login, registration} from '../http/userAPI';
import { useStore } from '../index';
import Alert from '../components/Alert'

const Auth = () => {
    const [formControls, setFormControls] = useState({
        email: {
            label: 'Email',
            errorMessage: 'Некорректный email',
            value: '',
            touched: false,
            type: 'text'
        },
        password: {
            label: 'Пароль',
            errorMessage: 'Некорректный пароль',
            value: '',
            touched: false,
            type: 'password'
        }
    });

    const [openError, setOpenError] = useState(false);
    const [apiMessage, setApiMessage] = useState(null);
    const {pathname} = useLocation();
    const history = useHistory();
    const {user} = useStore();
    const isLogin = pathname === LOGIN_ROUTE;

    if (openError) setTimeout(() => setOpenError(false), 4000);

    const onChangeValue = (key, value) => {
        const control = formControls[key];

        control.value = value;
        control.touched = true;

        setFormControls({...formControls, [key]: control});
    }

    const auth = async e => {
        e.preventDefault();
        const email = formControls.email.value;
        const password = formControls.password.value;

        try {
            if (isLogin) {
                const data = await login(email, password);
                user.setIsAuth(true);
                user.setUser(data);
                history.push(SHOP_ROUTE);
                return
            }
            const data = await registration(email, password);
            user.setIsAuth(true);
            user.setUser(data);
            history.push(SHOP_ROUTE);

        } catch (err) {
            const formControlsCopy = {...formControls};
                
            Object.keys(formControls).forEach(key => {
                const control = formControls[key];
                if (!control.value) {
                    control.touched = true
                    formControlsCopy[key] = control;
                }
            });

            setFormControls(formControlsCopy);
            setApiMessage(err.response?.data.message);
            setOpenError(true);
        }
    }

    return (
        <Container>
            <Alert
                open={openError}
                errorMessage={apiMessage}
            />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 380}}>
                <Typography variant="h4" mb={3}>
                    {isLogin ? 'Войти' : 'Регистрация' }
                </Typography>
                <form
                    style={{width: 450}}
                    onSubmit={auth}
                >
                    {Object.keys(formControls).map(key => {
                        const control = formControls[key];

                        return (
                            <TextField
                                key={key}
                                type={control.type}
                                label={control.label}
                                onChange={e => onChangeValue(key, e.target.value)}
                                style={{width: '100%', marginTop: 15}}
                                error={!control.value && control.touched}
                                helperText={!control.value && control.touched && control.errorMessage}
                                autoComplete="on"
                            />
                        )
                    }) }
                    {isLogin ? (
                        <Typography mt={1}>
                            Нет аккаунта? <Link
                                    style={{color: '#6098ff'}}
                                    to={REGISTRATION_ROUTE}
                                >
                                    Зарегистрируйся!
                                </Link>
                        </Typography>
                    ) : (
                        <Typography mt={1}>
                            Есть аккаунт? <Link
                                    style={{color: '#6098ff'}}
                                    to={LOGIN_ROUTE}
                                >
                                    Войди!
                                </Link>
                        </Typography>
                    )}
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            variant="outlined"
                            style={{marginTop: 10}}
                            size="large"
                            type="submit"
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироватся'}
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Auth
import { observer } from 'mobx-react-lite';
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { useStore } from '..';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = observer(() => {
    const {user} = useStore()

    return (
        <Switch>
            {user.isAuthed && authRoutes.map(({path, component}) => (
                <Route key={path} path={path} component={component} exact />
            ))}
            {user.user.role === 'ADMIN' && adminRoutes.map(({path, component}) => (
                <Route key={path} path={path} component={component} exact />
            ))}
            {publicRoutes.map(({path, component}) => (
                <Route key={path} path={path} component={component} exact />
            ))}
            <Redirect to={SHOP_ROUTE} />
        </Switch>
    )
});

export default AppRouter
import React, { useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { useStore } from './index';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userAPI';
import Loader from './components/Loader';

const App = () => {
    const {user} = useStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setIsAuth(true);
            user.setUser(data);
        }).catch(err => console.error(err))
          .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <Loader />

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    )
}

export default App
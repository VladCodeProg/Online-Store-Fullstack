import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { DeviceStore } from './store/DeviceStore';
import { UserStore } from './store/UserStore';

const Context = createContext(null); 
export const useStore = () => useContext(Context);

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            device: new DeviceStore(),
        }}>
            <App />
        </Context.Provider>
    </React.StrictMode>,
    document.querySelector('#root')
);

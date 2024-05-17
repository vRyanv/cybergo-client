import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from 'notistack'
import SocketService from "~/service/socket/SocketService";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <SocketService>
        <BrowserRouter>
            <SnackbarProvider
                maxSnack={4}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                <App/>
            </SnackbarProvider>
        </BrowserRouter>
    </SocketService>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

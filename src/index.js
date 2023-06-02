import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';
import { ThemeProvider } from "../src/components/theme/Theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <ThemeProvider>
        <App/>
    </ThemeProvider>
    // </React.StrictMode>
);
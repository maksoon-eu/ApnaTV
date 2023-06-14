import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { BrowserRouter as Router } from "react-router-dom";
import './style/style.scss';
import { ThemeProvider } from "../src/components/theme/Theme";

import WebFont from 'webfontloader';

WebFont.load({
   google: {
     families: ['Source Sans Pro:400,600,700', 'sans-serif']
   }
});

const Root = () => <Router><App /></Router>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <ThemeProvider>
        <Root/>
    </ThemeProvider>
    // </React.StrictMode>
);
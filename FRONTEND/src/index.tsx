import * as React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App';
import './fonts/PT_Astra_Sans/PT-Astra-Sans_Bold.ttf';
import './fonts/PT_Astra_Sans/PT-Astra-Sans_Italic.ttf';
import './fonts/PT_Astra_Sans/PT-Astra-Sans_Regular.ttf';
import './fonts/PT_Astra_Sans/PT-Astra-Sans_Bold-Italic.ttf';
import './styles/index.scss';
import {BrowserRouter} from "react-router-dom";


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import StoreContextProvider from './context/StoreContext.jsx';

axios.defaults.baseURL = 'http://localhost:4000/api/';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StoreContextProvider>
            <App />
        </StoreContextProvider>
    </BrowserRouter>,
);

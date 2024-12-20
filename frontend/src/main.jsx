import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DataProviderFuncComp } from './context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <DataProviderFuncComp>
    <App />
    </DataProviderFuncComp>
  </BrowserRouter>,
)

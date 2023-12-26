// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'

// import App from './App'
// import { store } from './Redux/Store/Store'

// import './main.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <App />
//     </Provider>
//   </React.StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import createStoreWithMiddleware from './Redux/store/store';

import './main.css';

const store = createStoreWithMiddleware(); // Crea la tienda utilizando la función corregida

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

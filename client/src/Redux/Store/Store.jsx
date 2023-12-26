// import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk/dist/redux-thunk.esm.js";

// import rootReducer from "../Reducer/Reducer";

// const store= configureStore({
//     reducer: rootReducer,
//     middleware: [thunk],
//     devTools: process.env.NODE_ENV != "production" ? composeWithDevTools () : false,
// });
    
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Reducer/Reducer';

export default function myStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
}
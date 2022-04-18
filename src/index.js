import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'assets/style/global.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from '@shopify/polaris'
import { BrowserRouter  } from 'react-router-dom';
import { Provider, connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import rootReducer from './reduxHandler';

const store = createStore(rootReducer);

function WrappedApp(){
  return (
    <Provider store={store}>
      <AppProvider>
        <BrowserRouter >
          <App />
        </BrowserRouter >
      </AppProvider>
    </Provider>
  )
}

ReactDOM.render(<WrappedApp/>, document.getElementById('root'));

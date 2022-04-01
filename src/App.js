import logo from './logo.svg';
import './App.css';
import Header from './modules/frame/header.js'
import RouteList from './modules/routes';
import React from 'react';
import { Paper } from '@mui/material';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Header/>
          <RouteList/>
      </React.Fragment>
    </div>
  );
}

export default App;

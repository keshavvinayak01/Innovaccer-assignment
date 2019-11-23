import React from 'react';
import './App.css';
import HomeComponent from './HomeComponent';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import logo from './assets/logo.svg'
function App() {
  return (
    <div className="App">
      <h1><img src={logo} alt=""/></h1>
      <HomeComponent />
    </div>
  );
}

export default App;

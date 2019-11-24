import React from 'react';
import './App.css';
import HomeComponent from './HomeComponent';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import logo from './assets/logo.svg'
import styled from 'styled-components'


const StyledHeading = styled.h2`
font-style: italic;
margin-top : 20px;
padding : 0 10px 0 10px;
`
function App() {
  return (
    <div className="App">
      <h1><img src={logo} alt=""/></h1>
      <StyledHeading className="primary-text">Hey there visitor! Please fill out this quick form</StyledHeading>
      <HomeComponent />

    </div>
  );
}

export default App;

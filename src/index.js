import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage1';
import NavBar from './NavBar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <NavBar/>
    <HomePage />
  </React.StrictMode>
  
);



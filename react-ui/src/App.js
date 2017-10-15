import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';

// This component is rendered by our <BrowserRouter>
const App = () => (
  <div>
    <Navbar />
    <Main />
    <Footer />
  </div>
);

export default App;

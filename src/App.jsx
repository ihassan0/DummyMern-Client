import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './screens/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
}  from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import StripePage from './screens/Stripe';

// import CartProvider from './components/ContextReducer';
CartProvider

function App() {

  return (
    <CartProvider>
    <Router>
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/createuser' element={<Signup/>} />
      <Route exact path='/myOrder' element={<MyOrder/>} />
     </Routes>
  </Router>
 </CartProvider>
  )
}

export default App

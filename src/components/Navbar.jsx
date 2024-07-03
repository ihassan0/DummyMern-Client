import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'
export default function Navbar() {
  const navigate = useNavigate()
  const data = useCart()
 const [cartview, setCartView] = useState(false)
  const handlelogout = () => {
    localStorage.removeItem('authToken')
    navigate("/login")
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <Link className="navbar-brand font-italic font-weight-bold fs-2" to="/">Foodie</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav me-auto mb-2">
      <li className="nav-item active fs-5">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      {(localStorage.getItem('authToken'))?
       <li className="nav-item active fs-5">
       <Link className="nav-link" to="/myOrder">Myorder</Link>
     </li> : ""
      }
    </ul>
    
      {(!localStorage.getItem('authToken')) ? 
      <div className='d-flex'>
        <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
        <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
        </div>
   
      :
      <>
      <div className="btn bg-white text-success mx-1" onClick={() => {
        setCartView(true)
      }}>
         Cart {" "}
        <Badge pill bg='danger'>{data.length}</Badge>

      </div>
      {cartview? <Modal onClose={() => {setCartView(false)}}><Cart /></Modal>: null}
      <div className="btn bg-white text-success mx-1" onClick={handlelogout}> Logout</div>
      </>
    }
    
  </div>
</nav>
    </div>
  )
}

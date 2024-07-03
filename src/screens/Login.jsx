import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
export default function Login() {
  const [email, SetEmail] = useState()
  const[password, SetPassword] = useState()
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  const handleformSubmit = (e) => {
      e.preventDefault();
      const response = axios.post(`https://dummy-mern-server.vercel.app/api/loginUser`,{
          email, password
      })
      .then(result => {
        const authToken = result.data.authToken;
        localStorage.setItem('authToken', authToken);
        const parsedData = JSON.parse(result.config.data);
       const email = parsedData.email;
       localStorage.setItem('userEmail', email)
       navigate('/')
    })
    .catch(error => {
        setErrorMessage(error.response.data.errors);
        console.error(error.response.data.errors);
      });
    //   console.log(localStorage.getItem('authToken'))
     
  }
  return (
    <div>
      <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card my-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
                            <form onSubmit={handleformSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email"
                                    onChange={ (e) => SetEmail(e.target.value)}
                                     />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password"
                                    onChange={ (e) => SetPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                                <Link to='/createuser' className='m-3 btn btn-danger'>New User?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

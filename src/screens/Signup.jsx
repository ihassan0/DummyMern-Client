import React, { useState } from 'react'
import '../assets/signupform.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Signup() {
    const [name, SetName] = useState()
    const [email, SetEmail] = useState()
    const [location, SetLocation] = useState()
    const[password, SetPassword] = useState()
    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePass, setErrorMessagePass] = useState('');
    const navigate = useNavigate()
    const handleformSubmit = (e) => {
        e.preventDefault();
        const response = axios.post(`https://dummy-mern-server.vercel.app/api/createUser`,{
            name, email, location, password
        })
        .then(result => {console.log(result)
            navigate('/login')
        })
        .catch(err => {
            // console.log(err.response.data.errors)
            if (err.response.data.errors) {
                console.log('hi')
                // Map errors to an object
                const errorObj = err.response.data.errors.reduce((acc, error) => {
                    // console.log(acc)
                    acc[error.path] = error.msg;
                    return acc;
                }, {});
                setErrorMessageName(errorObj.name);
                setErrorMessageEmail(errorObj.email);
                setErrorMessagePass(errorObj.password);
                console.log(errorObj.email)
            } else {
                console.log("In");
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })
        
    }
  return (
    <>
    <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card my-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">Sign Up</h3>
                            <form onSubmit={handleformSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control"name='name' required  id="name" placeholder="Enter your name"
                                    onChange={ (e) => SetName(e.target.value) } 
                                    />
                                    {errorMessageName && <p className='text-danger'>{errorMessageName}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="text" className="form-control" id="email" required  placeholder="Enter your email"
                                    onChange={ (e) => SetEmail(e.target.value)}
                                     />
                                     {errorMessageEmail && <p className='text-danger'>{errorMessageEmail}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Location</label>
                                    <input type="text" className="form-control" id="location" required  placeholder="Enter your Location"
                                    onChange={ (e) => SetLocation(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password"  required placeholder="Enter your password"
                                    onChange={ (e) => SetPassword(e.target.value)}
                                    />
                                    {errorMessagePass && <p className='text-danger'>{errorMessagePass}</p>}
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                <Link to='/login' className='m-3 btn btn-danger'>Login</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../app/auth_service';

export default function Login() {

    const navigate = useNavigate();

    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState();

    const handleUsernameChange = (e) => {
        const newValue = e.target.value;
        setUsername(newValue);
    }

    const handlePasswordChange = (e) => {
        const newValue = e.target.value;
        setPassword(newValue);
    }


    const handleLoginSubmit = (e) => {
        e.preventDefault();
        login({ username: username, password: password })
            .then((response => {
                const data = response.data;
                localStorage.setItem('accessToken', data.accessToken);
                navigate("/")
            }))
            .catch((error) => {
                setError(error.message);
            })
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const errorMessage = queryParams.get('error');
        if (errorMessage) {
            setError(errorMessage);
        }
    }, [location.search]);

    return (
        <div className='container vh-100'>
            <div className='row d-flex justify-content-center align-items-center h-100'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <h3 className='mb-3'>Log in to your account</h3>
                            <form onSubmit={handleLoginSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Username:</label>
                                    <input
                                        type='text'
                                        autoFocus="true"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Password:</label>
                                    <input
                                        type='password'
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className='form-control' />
                                </div>
                                {error &&
                                    <div className='mb-1 text-center'>
                                        <span className='text-danger'>
                                            {error == 'expired' ? 'Your session has expired. Please log in again.' : error}
                                        </span>
                                    </div>
                                }
                                <button type='submit' className='btn btn-primary' >Connect</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

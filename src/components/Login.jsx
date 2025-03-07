import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../app/app';

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        login({username: username, password: password})
        .then((response => {
            const data = response.data;
            localStorage.setItem('accessToken', data.accessToken);
            navigate("/")
        }))
        .catch((error) => {
        console.log(error);
        })
    }

    return (
        <div className='p-1 m-1' style={{ height: '500px' }}>
            <div className='row d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <h3>Log in to your account</h3>
                            <form onSubmit={handleLoginSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Username:</label>
                                    <input
                                        type='text'
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

                                <button type='submit' className='btn btn-primary' >Connect</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

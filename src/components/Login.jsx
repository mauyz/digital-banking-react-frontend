import React from 'react'

export default function Login() {
    return (
        <div className='p-1 m-1' style={{ height: '500px' }}>
            <div className='row d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <h3>Log in to your account</h3>
                            <form>
                                <div className='mb-3'>
                                    <label className='form-label'>Username:</label>
                                    <input type='text' className='form-control'></input>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Password:</label>
                                    <input type='password' className='form-control'></input>
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

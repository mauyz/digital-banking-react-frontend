import React, { useState } from 'react'
import { saveCutomer, saveCutomerWithUser } from '../../app/admin_service';
import { useNavigate } from 'react-router-dom';

export default function NewCustomer() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retyPassword, setRetyPassword] = useState('');

  const [error, setError] = useState();

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    let saveCustomerCallBack;
    if (username != '' && password != '') {
      if (retyPassword != password) {
        setError("Passwords don't match");
        return;
      }
      saveCustomerCallBack = saveCutomerWithUser(
        {
          email: email,
          name: name,
          username: username,
          password: password
        }
      );
    }
    else {
      saveCustomerCallBack = saveCutomer(
        {
          email: email,
          name: name,
        }
      );
    }
    saveCustomerCallBack
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        setError(e.message);
      })
  }

  return (
    <div className='col-md-4 mt-2'>
      <div className='card p-1'>
        <div className='card-body'>
          <form onSubmit={handleSaveCustomer}>
            <div className='mb-2'>
              <h6 className='my-2'>Customer informations</h6>
              <div className='mb-2'>
                <label className='form-label'>
                  Email:
                </label>
                <input
                  className='form-control'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true} >

                </input>
              </div>

              <div className='mb-2'>
                <label className='form-label'>
                  Name:
                </label>
                <input
                  className='form-control'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}>
                </input>
              </div>
            </div>
            <div className='mb-2'>
              <h6 className='my-2'>User informations(Optionnal)</h6>
              <div className='mb-2'>
                <label className='form-label'>
                  Username:
                </label>
                <input
                  className='form-control'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type='text'>
                </input>
              </div>
              <div className='mb-2'>
                <label className='form-label'>
                  Password:
                </label>
                <input
                  className='form-control'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}>
                </input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>
                  Retype password:
                </label>
                <input
                  className='form-control'
                  type='password'
                  value={retyPassword}
                  onChange={(e) => setRetyPassword(e.target.value)}>
                </input>
              </div>
              {
                error &&
                <div className='mb-3'>
                  <span className='text-danger'>
                    {error}
                  </span>
                </div>
              }
            </div>
            <button type='submit' className='btn btn-primary'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

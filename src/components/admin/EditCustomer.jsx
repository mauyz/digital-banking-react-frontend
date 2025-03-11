import React, { useEffect, useState } from 'react'
import { getCustomer, updateCutomer } from '../../app/admin_service';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader';

export default function EditCustomer() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState();
  const [error, setError] = useState();

  useEffect(
    () => {
      getCustomer(id)
        .then((response) => {
          setLoading(false);
          const customer = response.data;
          setEmail(customer.email);
          setName(customer.name);
        })
        .catch((error) => {
          setFetchError(error.message);
        });
    }, [id]

  );

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    updateCutomer(id, {
      email: email,
      name: name
    })
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    loading
      ? <Loader />
      : fetchError
        ? <div className='mb-3'>
          <span className='text-danger'>
            {fetchError}
          </span>
        </div>
        : <div className='col-md-4 mt-2'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='my-2'>Edit customer</h5>
              <form onSubmit={handleSaveCustomer}>
                <div className='mb-2'>
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
                {
                  error &&
                  <div className='mb-3'>
                    <span className='text-danger'>
                      {error}
                    </span>
                  </div>
                }
                <button type='submit' className='btn btn-primary'>Save</button>
              </form>
            </div>
          </div>
        </div>
  )
}

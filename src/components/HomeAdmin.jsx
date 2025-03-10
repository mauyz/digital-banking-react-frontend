import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { deleteCutomer, getCutomers } from '../app/admin_service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function HomeAdmin() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            getCutomers()
                .then((response) => {
                    const list = response.data;
                    setCustomers(list);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }, []
    )

    const handleDeleteCustomer = (customer) => {
        if (confirm(`Do you really delete ${customer.name}`)) {
            deleteCutomer(customer)
                .then(() => {
                    const list = customers.filter(item => item.id != customer.id);
                    setCustomers(list);
                })
        }
    }

    return (
        loading
            ? <Loader />
            : <div className='col-md-6'>
                <div className='card mt-3 p-2'>
                    <div className='card-body'>
                        <h3 className='my-2'>List of customers</h3>
                        {
                            customers.length == 0
                                ? <h6 className='fst-italic'>No customer registered</h6>
                                : <table className='table'>
                                    <thead className='table-light'>
                                        <tr>
                                            <td>ID</td>
                                            <td>Name</td>
                                            <td>Email</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            customers.map((item) => {
                                                return <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>
                                                        <button className='btn btn-outline-success me-2'>
                                                            <FontAwesomeIcon icon={faPen}>

                                                            </FontAwesomeIcon>
                                                        </button>
                                                        <button className='btn btn-outline-danger' onClick={() => handleDeleteCustomer(item)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>;
                                            })
                                        }
                                    </tbody>
                                </table>
                        }
                    </div>
                </div>
            </div>
    )
}

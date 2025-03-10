import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { getProfile } from '../app/auth_service';

export default function Profile() {

    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            getProfile()
                .then((response) => {
                    setTimeout(() => {
                        setProfile(response.data);
                        setLoading(false);
                        
                    }, 1500);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []
    )

    return (
        loading
            ?
            <Loader />
            :
            <div className='card p-2 mt-2'>
                <h3>Profile</h3>
                <div className='mt-1'>
                    <label className='fw-bold'>
                        Username:
                    </label>
                    <label className='px-2 text-primary'>
                        {profile.name}
                    </label>
                </div>

                <div className='mt-1'>
                    <label className='fw-bold'>
                        Roles:
                    </label>
                    <label className='px-2 text-primary'>
                        {profile.principal.claims.authorities.join(', ')}
                    </label>
                </div>
            </div>

    )
}

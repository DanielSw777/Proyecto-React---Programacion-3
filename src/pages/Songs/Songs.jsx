import React from 'react'
import useFetch from '../../Hooks/useFetch'
import { useAuth } from '../../context/AuthProvider';

const Songs = () => {

    const { token } = useAuth("state");

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;",
            "Authentication": `Token ${token}`
        },
    };


    return (
        <>
            <div className='songs__container'>
                <h1 className='songs__title'>Songs</h1>
            </div>
            <div>
                {

                }
            </div>
        </>
    )
}

export default Songs

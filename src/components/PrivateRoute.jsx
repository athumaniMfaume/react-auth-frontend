import React from 'react'
import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const PrivateRoute =  ()=> {

    const {user, loading} = useAuth();

    if(loading){
        return <div>Loading...</div>
    }   


  return user ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
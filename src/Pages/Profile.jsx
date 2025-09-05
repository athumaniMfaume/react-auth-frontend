import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import moment from 'moment/moment';



export default function Profile() {

    const {user, clearAuthState} = useAuth();

    const userLogout = () =>{
        clearAuthState();
    };

    return (
        <>
            <div>
                <div className='bg-indigo-700 text-white w-64 fixed h-full px-4 py-8'>
                    <div className='flex items-center space-x-2 px-4 mb-10'>
                        <i className='fas fa-rocket text-2xl'></i>
                        <span className='text-2xl font-bold'>Dashboard</span>
                    </div>
                    <nav>
                        <div className='space-y-2'>
                            <a href="#" className='flex items-center space-x-3 px-4 py-3 bg-indigo-800 rounded-lg'>
                                <i className='fas fa-user'></i>
                                <span>Profile</span>
                            </a>
                            <a href="#" onClick={userLogout}  className='flex items-center space-x-3 px-4 py-3 hover:bg-indigo-800 rounded-lg'>
                                <i className='fas fa-sign-out-alt'></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </nav>
                    <div className='absolute bottom-0 left-0 right-0 p-4'>
                        <div className='flex items-center space-x-3 px-4 py-3 bg-indigo-800 rounded-lg '>
                            <div className='w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-indigo-700'>
                                <i className='fas fa-user-circle text-sm'></i>
                            </div>
                            <div>
                                <p className='text-sm  font-medium'>{user.name}</p>
                                <p className='text-xs text-indigo-200'>  { user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ml-64 p-8'>
                    <div className='bg-white rounded-lg shadow p-6'>
                        <div className='flex justify-between items-center mb-6'>
                            <h1 className='text-2xl font-bold text-gray-800'>Profile</h1>
                            <div className='flex items-center space-x-4'>
                                <span className='text-xl text-gray-600'>Welcome back! {user.name}</span>
                                <div className='w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white'>
                                    <i className='fas fa-bell text-indigo-600'></i>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='md:col-span-2'>
                                <div className='bg-gray-50 p-6 rounded-lg'>
                                                                                                <h2 className='text-lg font-semibold mb-4'>Personal Information</h2>
                                                                                                <div className='flex flex-col md:flex-row gap-6 mb-8'>
                                                                                                    {/* Profile Image Card */}
                                                                                                    <div className='bg-white rounded-lg shadow p-6 flex flex-col items-center w-full md:w-1/3'>
                                                                                                        <img
                                                                                                            src='https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff&size=128'
                                                                                                            alt='Profile'
                                                                                                            className='w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow mb-2'
                                                                                                        />
                                                                                                        <button className='mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm'>Change Photo</button>
                                                                                                    </div>
                                                                                                    {/* Personal Info Card */}
                                                                                                    <div className='bg-white rounded-lg shadow p-6 flex-1 flex flex-col justify-center mt-4 md:mt-0'>
                                                                                                        <div className='mb-2'>
                                                                                                            <span className='font-semibold text-gray-700'>Full Name: </span>
                                                                                                            <span className='text-gray-900'>{user.name}</span>
                                                                                                        </div>
                                                                                                        <div className='mb-2'>
                                                                                                            <span className='font-semibold text-gray-700'>Email: </span>
                                                                                                            <span className='text-gray-900'>{user.email}</span>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <span className='font-semibold text-gray-700'>Member Since: </span>
                                                                                                            <span className='text-gray-900'>{moment(user.created_at).format('MMMM D, Y')}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                {/* Edit Form Card */}
                                                                                                <div className='bg-white rounded-lg shadow p-6 w-full mt-4 md:mt-0'>
                                                                                                    <form className='space-y-6 w-full'>
                                                                                    <div>
                                                                                        <label className='block text-sm font-medium text-gray-700'>Full Name</label>
                                                                                        <input
                                                                                            type='text'
                                                                                            name='name'
                                                                                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                                                                            placeholder='John Doe'
                                                                                            defaultValue='John Doe'
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <label className='block text-sm font-medium text-gray-700'>Email</label>
                                                                                        <input
                                                                                            type='email'
                                                                                            name='email'
                                                                                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                                                                            placeholder='john@doe.com'
                                                                                            defaultValue='john@doe.com'
                                                                                        />
                                                                                    </div>
                                                                            
                                                                                    <button
                                                                                        type='submit'
                                                                                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors duration-200'
                                                                                    >
                                                                                        Save Changes
                                                                                    </button>
                                                                                </form>
                                                                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

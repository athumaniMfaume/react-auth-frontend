import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import api from '../api/api'
import { showError, successError } from '../Utils/notify';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../context/AuthContext';   


export default function Login() {

    const {user, updateAuthState} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [retryAfter, setRetryAfter] = useState(0);
    const [countDown, setCountDown] = useState(0);

    useEffect(() => {
        let timer;  
        
        if (retryAfter > 0) {
            setCountDown(retryAfter);
            timer = setInterval(() => {
                setCountDown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setRetryAfter(0);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);       
            
        }

        return () => clearInterval(timer);
    }, [retryAfter]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/login', { email, password });
            if (response.data.status === 200) {
                successError(response.data.message);
                updateAuthState(response.data.token, response.data.user);
                navigate('/profile');
            } else {
                showError(response.data.message || 'Login failed');
            }
        } catch (error) {
            const status = error?.response?.status;
            if (status === 429) {
                setRetryAfter(error.response.data.retry_after);  
            }else {    
                showError(error.response?.data?.message || 'Login failed'); 

            }  
            
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold text-indigo-600'>Welcome Back!</h1>
                        <p className='text-gray-600 mt-2'>Please login to your account</p>
                    </div>

                    <form className='space-y-6' onSubmit={handleSubmit} autoComplete='off'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Email</label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <i className='fas fa-envelope text-gray-400'></i>
                                </div>
                                <input className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' type="email" name="email" id="email" placeholder='your@example.com' value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Password</label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <i className='fas fa-lock text-gray-400'></i>
                                </div>
                                <input className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' type="password" name="password" id="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <input type="checkbox" name="remember" id="remember" className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded' />
                                <label htmlFor="remember" className='ml-2 block text-sm text-gray-900'>Remember me</label>
                            </div>
                            <div className='text-sm'>
                                <a href="#" className='font-medium text-indigo-600 hover:text-indigo-500'>Forgot your password?</a>
                            </div>
                        </div>

                        <div>
                            {!loading && countDown === 0 ? (
                                <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-indigo-600 text-white font-semibold transition-colors duration-200 hover:border-white focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500' type='submit'>Login</button>
                            ) : countDown > 0 ? (

                                <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-gray-600 text-white font-semibold transition-colors duration-200 hover:border-white focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500' type='button' disabled>
                                   Too many attempts. Try again in {countDown} seconds
                                </button>
                            ) : (


                                <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-indigo-600 text-white font-semibold transition-colors duration-200 hover:border-white focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500' type='button'>
                                    <ClipLoader color='white' loading={true} size={14}/>
                                </button>
                            )}
                        </div>
                    </form>

                    <div className='mt-6 '>
                        <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                        </div>

                    </div>
                    
                </div>

                <div className='mt-6 text-center'>
                    <p className='text-sm text-gray-600'>Don't have an account? <Link to="/register" className='font-medium text-indigo-600 hover:text-indigo-500'>Sign up</Link></p>

                </div>

            </div>
        </div>
    </div>
  )
}

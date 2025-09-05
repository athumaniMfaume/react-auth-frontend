import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router'
import api from '../api/api'
import { showError, successError } from '../Utils/notify';
import { ClipLoader } from 'react-spinners';

export default function Register() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        if (password !== confirmpassword) {
            showError("Passwords do not match");
            setLoading(false);
            return; 
        }

        if (!terms) {
            showError("You must agree to the terms and conditions");
            setLoading(false);
            return; 
        }

    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: confirmpassword
      });
            // console.log(response.data);

            if (response.data.status == 201) {
                successError(response.data.message);
                navigate('/');
                
            } else {
                showError('something went wrong');
            }
            
        } catch (error) {
            showError(error.response.data.message);
        }finally{
            setLoading(false);
        }
          
    };


  return (
    <div>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-indigo-600'>Create Account</h1>
            <p className='text-gray-600 mt-2'>Register a new account</p>
          </div>

          <form className='space-y-6' onSubmit={handleSubmit}  autoComplete='off'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Name</label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <i className='fas fa-user text-gray-400'></i>
                </div>
                <input className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" id="name" placeholder='Your Name' />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Email</label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <i className='fas fa-envelope text-gray-400'></i>
                </div>
                <input className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" id="email" placeholder='your@example.com' />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Password</label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <i className='fas fa-lock text-gray-400'></i>
                </div>
                <input className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="password" placeholder='Create a password' />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Confirm Password</label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <i className='fas fa-lock text-gray-400'></i>
                </div>
                <input className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' type="password" value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)} name="password_confirmation" id="password_confirmation" placeholder='Confirm your password' />
              </div>
            </div>

            <div className='flex items-center'>
              <input
                type='checkbox'
                id='terms'
                name='terms'
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />
              <label htmlFor='terms' className='ml-2 block text-sm text-gray-900'>
                I agree to the <a href='#' className='text-indigo-600 hover:underline'>Terms and Conditions</a>
              </label>
            </div>
            <div>
                {!loading ? (
                    <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-indigo-600 text-white font-semibold transition-colors duration-200 hover:border-white focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500' type='submit'>
                        Create Account
                    </button>
                ) : (   
              <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-indigo-600 text-white font-semibold transition-colors duration-200 hover:border-white focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500' type='button'> <ClipLoader color='white' loading={true}
               size={14}/> </button>
                )}
            </div>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>Already have an account? <Link to="/" className='font-medium text-indigo-600 hover:text-indigo-500'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

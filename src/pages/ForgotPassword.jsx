import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  
  function onChange(e){
      setEmail(e.target.value)
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email sent")

    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <section className='bg-white dark:bg-gray-900'>
      <h1 className='text-3xl text-center pt-6 font-bold text-black dark:text-gray-300'>Şifrə dəyişimi</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'> 
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80" alt="key"
          className='w-full rounded-2xl' />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type="email" id="email" value={email} onChange={onChange} placeholder="Email" />
      
        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
          <p className='mb-6 text-black dark:text-gray-300'>Hesabın yoxdur?<Link to='/sign-up' className='text-red-600 dark:text-yellow-400 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Qeydiyyat</Link></p>
          <p><Link to='/sign-in' className='text-blue-600 dark:text-blue-400 hover:text-blue-800 transition duration-200 ease-in-out'>Daxil ol</Link></p>
        </div>
        <button type="submit" className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Yeni şifrə göndər</button>
        <div className='my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t  after:flex-1  after:border-gray-300'>
          <p className='text-center font-semibold mx-4 text-black dark:text-gray-300'>və ya</p>
        </div>
        <OAuth />
        </form>
     
        </div>
      </div>
    </section>
  )
}

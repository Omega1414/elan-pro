import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase'
export default function OAuth() {
  const navigate = useNavigate()
 async function onGoogleClick(){
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      } 
      navigate('/')
    } catch (error) {
      toast.error(error.message)
      
    }
  }
  return (
    <button onClick={onGoogleClick} type="button" className='flex text-center item-center justify-center w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-150 ease-in-out hover:shadow-lg active:shadow-lg active:bg-red-800'>
        <FcGoogle className='text-xl bg-white rounded-full mr-2 ' /> Continue with Google</button>
  )
}

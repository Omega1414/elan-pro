import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



export const Footer = () => {
    const [pageState, setPageState] = useState("Sign In")
    const [formData, setFormData] = useState({

        email: "",
    
      });
      const {email} = formData;
      function onChange(e){
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }))
      }
    const location = useLocation()
    const navigate = useNavigate()
    const auth = getAuth()
    useEffect(() => {
            onAuthStateChanged(auth, (user)=> {
            if(user){
                setPageState("Profile")
            } else{setPageState("Sign In")}
        })
    },[auth])
  
    function pathMatchRoute(route) {
        if (route === location.pathname) {
          return true;
        }
    
      }
    function onSubmit(e){
        e.preventDefault()
        setFormData((prevState) => ({
            
            prevState: "",
          }))
     toast.success("Abunəlik aktivləşdirildi")
      }
  return (

<footer className="w-full bg-gray-300 dark:bg-neutral-900 text-center text-white flex flex-col justify-between mt-auto mx-auto">
<div className="container px-6 pt-6 mx-auto text-center">
    <div className="mb-6 flex justify-center">
      <a
        href="#!"
        type="button"
        className="m-1 h-9 w-9 rounded-full  border-2 border-black dark:border-white uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:bg-white dark:hover:text-black hover:bg-opacity-8 focus:outline-none focus:ring-0"
        data-te-ripple-init
        data-te-ripple-color="light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-full w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      </a>

      <a
        href="#!"
        type="button"
        className="m-1 h-9 w-9 rounded-full border-2 border-black dark:border-white uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:bg-white dark:hover:text-black hover:bg-opacity-8 focus:outline-none focus:ring-0"
        data-te-ripple-init
        data-te-ripple-color="light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-full w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      </a>

      <a
        href="#!"
        type="button"
        className="m-1 h-9 w-9 rounded-full border-2 border-black dark:border-white uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:bg-white dark:hover:text-black hover:bg-opacity-8 focus:outline-none focus:ring-0"
        data-te-ripple-init
        data-te-ripple-color="light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-full w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
            fillRule="evenodd"
            clipRule="evenodd" />
        </svg>
      </a>

      <a
        href="#!"
        type="button"
        className="m-1 h-9 w-9 rounded-full border-2 border-black dark:border-white uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:bg-white dark:hover:text-black hover:bg-opacity-8 focus:outline-none focus:ring-0"
        data-te-ripple-init
        data-te-ripple-color="light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-full w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>


     
    </div>

    <div>
      <form action="">
        <div
          className="gird-cols-1 grid items-center justify-center gap-4 md:grid-cols-3">
          <div className="md:ml-auto md:mb-6">
            <p className="text-black dark:text-white font-semibold">
              <p>Elan xəbərləri üçün abunə ol:</p>
            </p>
          </div>

          <div className="relative md:mb-6" data-te-input-wrapper-init>
            <input
              type="email"
              className="peer block min-h-[auto] w-full rounded border-1 border-gray-600 bg-transparent py-[0.32rem] px-3 leading-[1.6] text-black outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="email"
              onChange={onChange}
              required
              value={email}
              placeholder="Email address" />
           
          </div>

          <div className="mb-6 md:mr-auto">
            <button
            onClick={onSubmit}
              type="submit"
              className="inline-block rounded border-2 border-black dark:border-neutral-50 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:border-gray-500 dark:hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-50 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
              data-te-ripple-color="light">
              Abunə ol
            </button>
          </div>
        </div>
      </form>
    </div>

    <div className="mb-6 text-black dark:text-white">
      <p>
       Sayt hazırda fəaliyyətdə deyil və sadəcə təqdimat məqsədi ilə hazırlanıb. Gördüyünüz elanlar saytın funksionallığını və dizaynını göstərmək üçün developer tərəfindən tərtib olunub və real ev elanları deyil.
      </p>
    </div>

  
  </div>

 <div className="mt-6 p-4 w-full text-center text-black dark:text-white border-t border-gray-400 dark:border-neutral-700">
    © 2023 Müəllif hüquqları:{' '}
    <a className="underline hover:text-gray-700 dark:hover:text-gray-300" href="#">
      Vasif Babazadə
    </a>
  </div>
</footer>

  )
}

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'



export const Header = ({theme, setTheme, handleThemeSwitch}) => {
    const [pageState, setPageState] = useState("Daxil ol")
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef(null);
    const location = useLocation()
    const navigate = useNavigate()
    const auth = getAuth()
    useEffect(() => {
       
      
        onAuthStateChanged(auth, (user)=> {
            if(user){
                setPageState("Profil")
            } else{setPageState("Daxil ol")}
        })
    },[auth])
  
    function pathMatchRoute(route) {
        if (route === location.pathname) {
          return true;
        }
     
      }
      const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
          if (
            document.body.scrollTop > 10 ||
            document.documentElement.scrollTop > 10
          ) {
            setIsScrolled(true)
      
          } else {
            setIsScrolled(false)
      
          }      
        });
      };
      useEffect(() => {
        stickyHeaderFunc();
        return window.removeEventListener("scroll", stickyHeaderFunc);
        
      });
  return (
    <div className=  {` z-40 transition delay-100 ease-in-out w-full ${isScrolled ? "fixed bg-gray-300 dark:bg-black" : "sticky bg-white dark:bg-gray-900"}`} ref={headerRef} >
        <header className=' flex  justify-between items-center px-3 max-w-6xl mx-auto w-full  z-50 ' >
            <div>
            <img src={logo} alt="logo" className='h-5 cursor-pointer dark:invert' onClick={() => navigate("/")}  />
            </div>
            <div>
                <ul className='flex  xxs:space-x-2 xs:space-x-6 s:space-x-7  md:space-x-12'>
                    <li className={`cursor-pointer py-3 xxs:text-xs xs:text-sm  font-semibold border-b-[3px]  ${
                pathMatchRoute("/") ?  "border-b-red-500 dark:border-b-yellow-400 text-black dark:text-white" : "text-gray-500 dark:text-gray-300 border-b-transparent"}`}  onClick={() => navigate("/")}>Əsas</li>
                    <li
                     className={`cursor-pointer py-3 xxs:text-xs xs:text-sm  font-semibold border-b-[3px]  ${
                        pathMatchRoute("/offers") ?  "border-b-red-500 text-black dark:text-white" : "text-gray-500 dark:text-gray-300 border-b-transparent"
                      }`}
                        onClick={() => navigate("/offers")}>Elanlar</li>
                    <li className={`cursor-pointer py-3 xxs:text-xs xs:text-sm font-semibold border-b-[3px] ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile"))? "border-b-red-500 text-black dark:text-white" : "text-gray-500 dark:text-gray-300 border-b-transparent"}`}  onClick={() => navigate("/profile")}>{pageState}</li>
                    <li className='cursor-pointer py-3 xxs:text-xs xs:text-sm  font-semibold '>
                     
                    <button onClick={handleThemeSwitch}>
                        {theme === "dark" ? 
                        <svg
                        v-if="dark"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4.5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                      >
                        <path
                          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                        />
                      </svg>
                      :
                      <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4.5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    }
   
  
  </button>
                    </li>
                </ul>
            </div>
        </header>
       
    </div>
  )
}

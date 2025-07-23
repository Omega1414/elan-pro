import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Listing from './pages/Listing'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Category from './pages/Category'
import { Footer } from './components/Footer'
import { useEffect, useState } from 'react'

function App() {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
   
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      // Əgər yoxdursa, cihazın temasına bax
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const defaultTheme = prefersDark ? "dark" : "light"
      setTheme(defaultTheme)
      localStorage.setItem("theme", defaultTheme)
    }
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      document.body.classList.remove("bg-light")
      document.body.classList.add("bg-dark")
    } else {
      document.documentElement.classList.remove("dark")
      document.body.classList.remove("bg-dark")
      document.body.classList.add("bg-light")
    }

    if (theme) {
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header handleThemeSwitch={handleThemeSwitch} theme={theme} setTheme={setTheme} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/create-listing" element={<PrivateRoute />}>
              <Route path="/create-listing" element={<CreateListing />} />
            </Route>
            <Route path="/edit-listing" element={<PrivateRoute />}>
              <Route path="/edit-listing/:listingId" element={<EditListing />} />
            </Route>
            <Route path="/category/:categoryName/:listingId" element={<Listing />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
      />
    </Router>
  )
}

export default App

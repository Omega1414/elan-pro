import { getAuth, updateProfile } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import {FcHome} from 'react-icons/fc'
import ListingItem from '../components/ListingItem';

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false)
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
   
  });
  const {name, email} = formData;
  function onLogout(){
    auth.signOut()
    navigate('/')
  }
 async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser,{
          displayName: name
        })
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name
        })
        toast.success("Ugurla deyisildi")
      }
    
    } catch (error) {
      toast.error("Daha sonra cehd edin")
    }
  }
  useEffect(() => {
    async function fetchUserListings(){
    
      const listingRef = collection(db, "listings")
      const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
    } 
    fetchUserListings()
  },[auth.currentUser.uid])
  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }
  function onEdit(listingID) {
    navigate(`/edit-listing/${listingID}`);
  }

async function searchBlog(e){
    if(search === ""){
      e.preventDefault()
      const listingRef = collection(db, "listings")
      const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(listings)
    } else {
      e.preventDefault()
      setListings(listings.filter((listing)=> 
      listing.data.name.toLowerCase().includes(search.toLowerCase())
      ))
    }
  
  }

  return (
    <div className='bg-white dark:bg-gray-900'>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold text-black dark:text-white'>Profilim</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'> 
      <div className='mb-4 '>
     
      <form onSubmit={(e) => searchBlog(e)} >
     <div className="relative md:mb-6" data-te-input-wrapper-init>
     <div
          className=" items-center justify-center gap-4 flex flex-row ">
       
            <p className="flex justify-end text-black dark:text-white">
              <p className='font-semibold'>Axtarış</p>
            </p>
      
       <input 
        className="peer block min-h-[auto] xxs:w-[100px] xs:w-[150px] s:w-[200px] md:w-[300px] rounded border-3 border-gray-500 bg-transparent py-[0.32rem] px-3 leading-[1.6] text-black outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-600 dark:bg-opacity-90"
        type="text"
        placeholder="Axtarış"
       onChange={(e) => {
         setSearch(e.target.value)
       }} />
       <button type="submit"  className="inline-block rounded border-2 border-gray-900 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-gray-900 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-blue-900 hover:bg-opacity-40 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:bg-black dark:border-gray-600 dark:text-white dark:hover:bg-green-900 dark:hover:bg-opacity-90 w-[100px]"
              data-te-ripple-init
              data-te-ripple-color="light">Axtar</button>
       </div>
       </div>
     </form>
      </div>
        <form>
          <input type="text" id='name' value={name} disabled={!changeDetail} onChange={onChange} className={`mb-6 w-full px-4 py-2 text-xl  text-gray-600 border border-gray-300 rounded transition ease-in-out ${changeDetail ? "text-white bg-gray-500 focus:bg-gray-600 " : "bg-white focus:bg-white dark:bg-black dark:focus:bg-black"}`} />
          <input type="email" id='email' value={email} disabled className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' />
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 '>
            <p className='flex items-center text-black dark:text-white '>Adı dəyişmək istəyirsiz?
              <span onClick={() => {
                 changeDetail && onSubmit()
                setChangeDetail((prevState) => !prevState)
              }} className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-2 cursor-pointer'>{changeDetail ? "Yadda saxla" : "Dəyiş"}</span>
            </p>
            <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>Hesabdan çıx</p>
          </div>
        </form>
        <button type="submit" className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-800'>
          <Link to='/create-listing' className='flex justify-center items-center '>
          <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2' />
          Elan paylaş
          </Link>
        </button>
      </div>
    </section>
    <div className='max-w-6xl px-3 pt-6 mx-auto'>
      {!loading && listings.length > 0 &&(
        <>
        <h2 className='text-2xl text-center font-semibold mb-6 text-black dark:text-white'>Elanlarım</h2>
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 pb-6'>
          {listings.map((listing) => (
            <ListingItem key={listing.id} id={listing.id} listing={listing.data} onDelete={() => onDelete(listing.id)} onEdit={() => onEdit(listing.id)} />
          ))}
        </ul>
        </>
      )}
    </div>
    </div>
  )
}

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";


export default function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] = useState(null);
  const [search, setSearch] = useState("")
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
     
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing");
      }
    }

    fetchListings();
  }, []);

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
 
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState)=>[...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listing");
    }
  }
  
  async function searchBlog(e){
    if(search === ""){
      e.preventDefault()
      const listingRef = collection(db, "listings")
      const q = query(listingRef, orderBy("timestamp", "desc"))
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
    <div className=" mx-auto px-3 bg-white dark:bg-gray-900 w-full">
      <h1 className="text-3xl text-center pt-6 font-bold mb-6 text-black dark:text-white">Elanlar</h1>
      <div>
     
     <form onSubmit={(e) => searchBlog(e)} >
     <div className="relative md:mb-6" data-te-input-wrapper-init>
     <div
          className=" items-center justify-center gap-4 flex flex-row mb-4">
       
        
       <input 
        className="peer block min-h-[auto] w-[300px] rounded border-3 border-gray-500 bg-transparent py-[0.32rem] px-3 leading-[1.6] text-black outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:bg-opacity-90"
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
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className="flex justify-center items-center">
              <button
                onClick={onFetchMoreListings}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out dark:bg-gray-700 dark:text-white"
              >
                Daha çox
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Axtarışa uyğun nəticə tapılmadı</p>
      )}
    </div>
  );
}
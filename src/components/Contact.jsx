import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ userRef, listing,  setContactLandlord }) {
  const [landlord, setLandlord] = useState(null);

 
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    }
    getLandlord();
  }, [userRef]);
 
  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-300 mt-3">
           {landlord.name} ilə əlaqə :
          </p>
          <div className="mt-2 mb-2">
           <h1 className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">+994-----</h1>
          </div>
         
            <button className="px-7 py-3 w-52 bg-blue-600 text-white rounded text-md font-medium shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  text-center mb-2" type="button" onClick={() => setContactLandlord(false)}>
              Nömrəni Gizlət
            </button>
         
        </div>
      )}
    </>
  );
}
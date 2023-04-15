import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import {v4 as uuidv4} from 'uuid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function CreateListing() {
    const auth = getAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        temir: false
    })
    const {type, name, bedrooms, bathrooms, parking, furnished, address, description, regularPrice, discountedPrice, images, temir} = formData
    function onChange(e){
        let boolean = null;
        if(e.target.value === "true"){
            boolean = true
        }
        if(e.target.value === "false"){
            boolean = false
        }
        if(e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }
        if(!e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }))
        }
    }
   async function onSubmit(e){
        e.preventDefault()
        setLoading(true)
        if(+discountedPrice >= +regularPrice){
            setLoading(false)
            toast.error("Endirim evvelki qiymetden yuksek ola bilmez")
            return
        }
        if(images.length > 6 ){
            setLoading(false)
            toast.error("Maksimum 6 foto")
            return
        }
       async function storeImage(image){
            return new Promise ((resolve, reject) => {
                const storage = getStorage()
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image)
                uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    reject(error)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve(downloadURL);
    });
  }
) })
        }
        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))).catch((error) => {
                setLoading(false)
                toast.error("Foto olcusu uygun deyil")
                return
            })
            const formDataCopy = {
                ...formData,
                imgUrls,
                timestamp: serverTimestamp(),
                userRef: auth.currentUser.uid
            }
            delete formDataCopy.images;
            !formDataCopy.offer && delete formDataCopy.discountedPrice;
            const docRef = await addDoc(collection(db, "listings"), formDataCopy)
            setLoading(false)
            toast.success("Elave olundu")
            navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }   
  
    
    if(loading){
        return <Spinner/>
    }

  return (
    <div className='bg-gray-100 dark:bg-gray-900'>
    <main className='max-w-md px-2 mx-auto  '>
        <h1 className='text-3xl text-center pt-3 font-bold text-black dark:text-white '>Elan yarat</h1>
        <form onSubmit={onSubmit}>
            <p className='text-lg mt-6 font-semibold  text-black dark:text-white'>Satış / Kirayə</p>
            <div className='flex'>
                <button type='button' id='type' value='sale' onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm  shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type ==="rent" ? "bg-white text-black" : "bg-slate-600 text-white" }`}>
                    Satış
                </button>
                <button type='button' id='type' value='rent' onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm  shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type ==="sale" ? "bg-white text-black" : "bg-slate-600 text-white" }`}>
                    Kirayə
                </button>
            </div>
            <p className='text-lg mt-6 font-semibold  text-black dark:text-white'>Adı</p>
            <input type="text" id='name' value={name} onChange={onChange} placeholder='Adı' maxLength='32' minLength='10' required className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 ' />
            <div className='flex space-x-6 mb-6'>
                <div>
                    <p className='text-lg font-semibold  text-black dark:text-white'>Otaq sayı</p>
                    <input type="number" id="bedrooms" value={bedrooms} onChange={onChange} min='1' max='50' required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
                <div>
                    <p className='text-lg font-semibold  text-black dark:text-white'>Sahə {' '}(m<sup>2</sup>)</p>
                    <input type="number" id="bathrooms" value={bathrooms} onChange={onChange} min='1'  required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                </div>
               
            </div>
            <p className='text-lg mt-6 font-semibold  text-black dark:text-white'>Qaraj</p>
            <div className='flex'>
                <button type='button' id='parking' value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${ !parking ? "bg-white text-black" : "bg-slate-600 text-white" }`}>
                    Var
                </button>
                <button type='button' id='parking' value={false} onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${ parking ? "bg-white text-black" : "bg-slate-600 text-white" }`}>
                    Yoxdur
                </button>
            </div>
            {type === "rent" ? 
            <>
             <p className='text-lg mt-6 font-semibold  text-black dark:text-white'>Mebel</p>
             <div className='flex'>
                 <button type='button' id='furnished' value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm  shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!furnished? "bg-white text-black" : "bg-slate-600 text-white" }`}>
                 Mebelli
                 </button>
                 <button type='button' id='furnished' value={false} onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm  shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${ furnished ? "bg-white text-black" : "bg-slate-600 text-white" }`}>
                     Mebelsiz
                 </button>
             </div>
             </>
             :
             <>
              <p className='text-lg mt-6 font-semibold  text-black dark:text-white'>Təmir</p>
            <div className='flex'>
                <button type='button' id='temir' value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm  shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!temir? "bg-white text-black" : "bg-slate-600 text-white" }`}>
                Təmirli
                </button>
                <button type='button' id='temir' value={false} onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm  shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${ temir ? "bg-white text-black" : "bg-slate-600 text-white" }`}>
                Təmirsiz
                </button>
            </div>
             </>  }

            <p className='text-lg mt-6 font-semibold  text-black dark:text-white'>Ünvan</p>
            <textarea type="text" id='address' value={address} onChange={onChange} placeholder='Ünvan' required maxLength="90" className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 ' />
         
            <p className='text-lg font-semibold  text-black dark:text-white'>Məlumat</p>
            <textarea type="text" id='description' value={description} onChange={onChange} placeholder='Məlumat' required className='w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 ' />
          
          
            <div className='flex items-center mb-6'>
                <div>
                <p className='text-lg font-semibold  text-black dark:text-white'>Qiyməti</p>
                <div className='flex w-full justify-center items-center space-x-6'>
                    <input type="number" id="regularPrice" value={regularPrice} onChange={onChange} min="50" max="400000000" required className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-800 focus:bg-white focus:border-slate-600 text-center' />
                    {type === 'rent' && (
                    <div className=''>
                        <p className='text-md w-full whitespace-nowrap  text-black dark:text-white '>AZN / Ay</p>
                    </div>
                )}
                </div>
                </div>
            </div>
           
            <div className='mb-6'>
                <p className='text-lg font-semibold  text-black dark:text-white'>Şəkillər</p>
                <p className='text-gray-600 dark:text-gray-200'>İlk şəkil əsas olacaq (ən çox 6 şəkil)</p>
                <input type="file" id='images' onChange={onChange} accept='.jpg,.png,.jpeg' multiple required className='w-full px-3 py-1.5 text-gray-700  bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 ' />
            </div>
            <button type='submit' className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  '>Elanı dərc et</button>
        </form>
    </main>
    </div>
  )
}

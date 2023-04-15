import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {FaTrash} from 'react-icons/fa'
import {MdEdit} from 'react-icons/md'

export default function ListingItem({listing, id, onDelete, onEdit}) {
  return (
    <li className="relative bg-white dark:bg-gray-800 flex flex-col justify-between items-center shadow-md hover:scale-105 rounded-md overflow-hidden transition-scale duration-150 m-[10px]">
      <Link className='contents' to={`/category/${listing.type}/${id}`}>
        <img className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in" loading="lazy" src={listing.imgUrls[0]} alt="elan" />
        <Moment  className="absolute top-2 left-2 bg-[#3377cc] text-white  text-xs font-semibold rounded-md px-2 py-1 shadow-lg" fromNow>
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600 dark:text-white" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 dark:text-gray-200 truncate">{listing.address}</p>
          </div>
          <p className="font-semibold m-0 text-xl truncate text-black dark:text-gray-300">{listing.name}</p>
          <p className="text-[#05080a] mt-2 font-semibold  dark:text-gray-400">
            
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
         {''} AZN  {listing.type === "rent" && " / Aylıq"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs text-black dark:text-gray-400">
                {listing.bedrooms } Otaq
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs text-black dark:text-gray-400">
                {listing.bathrooms}  {' '}m<sup>2</sup>
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer text-black dark:text-white "
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  )
}

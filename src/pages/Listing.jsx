import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Moment from 'react-moment';
import 'moment/locale/az';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import { FaShare, FaMapMarkerAlt, FaParking, FaChair } from "react-icons/fa";
import { GiResize } from "react-icons/gi";
import { GrFormView } from "react-icons/gr";
import { BsFillHousesFill } from "react-icons/bs";
import { MdConstruction } from "react-icons/md";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { toast } from "react-toastify";
import './Gallery.css';

export default function Listing({ isVisible }) {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  async function onView() {
    try {
      const docRef = doc(db, "listings", params.listingId);
      await updateDoc(docRef, {
        view: increment(1)
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <main className="bg-white dark:bg-black">
      <div className="image-gallery">
        <ImageGallery
          items={listing.imgUrls.map(index => ({ original: index, thumbnail: index }))}
          showIndex={true}
          showBullets={true}
          infinite={true}
          showThumbnails={true}
          showFullscreenButton={true}
          showGalleryPlayButton={true}
          showNav={true}
          isRTL={false}
          slideOnThumbnailOver={false}
          thumbnailPosition="bottom"
        />
      </div>

      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied
        </p>
      )}

      <motion.div onViewportEnter={() => onView()}>
        <div className="m-0 flex flex-col md:flex-row lg:mx-auto p-2 md:p-4 rounded-lg shadow-lg bg-white dark:bg-gray-900 space-x-1 lg:space-x-5 w-full">
          <div className="w-full m-auto md:w-[75%]">
            <div className="flex flex-col">
              {/* Price, Type, View, and Date */}
              <div className="flex flex-row justify-between mb-4">
                {/* Left Column: Price and Type */}
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-start items-center space-x-4 w-full max-w-[200px] rounded-md p-1 bg-green-800">
                    <p className="w-full text-white text-center font-semibold shadow-md xxs:text-sm xs:text-xl">
                      {listing.offer
                        ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} AZN
                      {listing.type === "rent" ? " / Aylıq" : ""}
                    </p>
                  </div>
                  <div className="flex justify-start items-center space-x-4 w-full max-w-[200px] rounded-md p-1 bg-green-800">
                    <p className="w-full text-white text-center font-semibold shadow-md xxs:text-sm xs:text-xl">
                      {listing.type === "rent" ? "Kirayə" : "Satış"}
                    </p>
                  </div>
                </div>
                {/* Right Column: View and Date */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-center whitespace-nowrap cursor-pointer hover:scale-110 transition-scale duration-200 ease-in bg-[#3377cc] text-white text-md font-semibold rounded-md px-2 py-1 shadow-lg w-full max-w-[150px]">
                    <GrFormView className="text-2xl text-white mr-1" />
                    {listing.view} Baxış
                  </div>
                  <div className="flex items-center justify-center whitespace-nowrap cursor-pointer hover:scale-110 transition-scale duration-200 ease-in bg-[#3377cc] text-white text-md font-semibold rounded-md px-2 py-1 shadow-lg w-full max-w-[150px]">
                    <Moment locale="az" className="text-white" fromNow>
                      {listing.timestamp?.toDate()}
                    </Moment>
                  </div>
                </div>
              </div>

              {/* Listing Details */}
              <div className="flex justify-start flex-col">
                <div className="justify-center text-center md:text-center lg:text-start w-full mt-4">
                  <p className="text-2xl font-bold mb-3 text-blue-900 dark:text-gray-300">
                    {listing.name}
                  </p>
                </div>

                <div className="flex justify-center space-x-2 md:space-x-4 w-full text-center items-center h-full md:h-[50px] bg-blue-900 rounded-md p-1">
                  <FaMapMarkerAlt className="mr-2 ml-2 text-2xl font-semibold text-white dark:text-gray-300" />
                  <p className="flex items-center mt-2 mb-2 md:mt-0 md:mb-0 font-semibold text-white dark:text-gray-300 w-[370px] md:w-full break-all text-sm">
                    {listing.address}
                  </p>
                </div>

                <ul className="flex items-center space-x-1 xs:space-x-2 sm:space-x-10 xxs:text-sm xs:text-lg font-semibold mb-6 mt-4 md:mt-4 md:space-x-5 justify-center">
                  <li className="flex items-center whitespace-nowrap cursor-pointer hover:scale-110 transition-scale duration-200 ease-in text-black dark:text-gray-300">
                    <BsFillHousesFill className="xxs:text-sm xs:text-2xl mr-1" />
                    {+listing.bedrooms > 1 ? `${listing.bedrooms} Otaq` : "1 Otaq"}
                  </li>
                  <li className="flex items-center whitespace-nowrap cursor-pointer hover:scale-110 transition-scale duration-200 ease-in text-black dark:text-gray-300">
                    <GiResize className="xxs:text-sm xs:text-2xl mr-1" />
                    {+listing.bathrooms} m<sup>2</sup>
                  </li>
                  <li className="flex items-center whitespace-nowrap cursor-pointer hover:scale-110 transition-scale duration-200 ease-in text-black dark:text-gray-300">
                    <FaParking className="xxs:text-sm xs:text-2xl mr-1" />
                    {listing.parking ? "Qarajlı" : "Qarajsız"}
                  </li>
                  {listing.type === "rent" ? (
                    <li className="flex items-center whitespace-nowrap cursor-pointer hover:scale-110 transition-scale duration-200 ease-in text-black dark:text-gray-300">
                      <FaChair className="xxs:text-sm xs:text-2xl mr-1" />
                      {listing.furnished ? "Mebelli" : "Mebelsiz"}
                    </li>
                  ) : (
                    <li className="flex items-center whitespace-nowrap cursor-pointer hover:scale-110 transition-scale duration-200 ease-in text-black dark:text-gray-300">
                      <MdConstruction className="xxs:text-sm xs:text-2xl mr-1" />
                      {listing.furnished ? "Təmirli" : "Təmirsiz"}
                    </li>
                  )}
                </ul>

                <p className="mt-0 md:mt-2 lg:mt-8 mb-3 font-kanit xxs:text-base xs:text-lg text-justify p-2 text-black dark:text-gray-300">
                  {listing.description}
                </p>

                {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
                  <div className="mt-2">
                    <button
                      onClick={() => setContactLandlord(true)}
                      className="px-7 py-3 md:w-[200px] bg-blue-600 text-white font-medium text-md rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg text-center transition duration-150 ease-in-out"
                    >
                      Nömrəni Göstər
                    </button>
                  </div>
                )}
                {contactLandlord && (
                  <Contact userRef={listing.userRef} listing={listing} setContactLandlord={setContactLandlord} />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
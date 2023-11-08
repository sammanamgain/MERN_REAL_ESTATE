import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import Listing from "./Listing";
import { FaBackspace } from "react-icons/fa";
import Listingcard from "../Components/Listingcard";

export default function Home() {
  const [offerListing, setofferListing] = useState([]);
  const [salesListing, setsalesListing] = useState([]);
  const [rentListing, setrentListing] = useState([]);
  SwiperCore.use(Navigation);

  useEffect(() => {
    const fetchofferlisting = async () => {
      try {
        const res = await fetch("/api/listing/getall?offer=true&limit=6");
        const data = await res.json();
        setofferListing(data);
        fetchrentlisting();
      } catch (err) {
        console.log(err);
      }
    };
    fetchofferlisting();
    const fetchrentlisting = async () => {
      try {
        const res = await fetch("/api/listing/getall?type=rent&limit=4");
        const data = await res.json();
        setrentListing(data);
        fetchsalelisting();
      } catch (err) {
        console.log(err);
      }
    };

    const fetchsalelisting = async () => {
      try {
        const res = await fetch("/api/listing/getall?type=sale&limit=4");
        const data = await res.json();
        setsalesListing(data);
      } catch (err) {
        console.log(err);
      }
    };
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 py-28 px-3 max-w6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl ">
          {" "}
          Find your next <span className="text-slate-500 ">perfect</span>
          <br /> place with ease
        </h1>

        <div className="text-grey-500 text-xs sm:text-sm ">
          Amgain Estate is best Webapplication to find your next perfect to
          spend your rest of the life
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs tex-blue-800 font-bold hover:underline"
        >
          Let's get started
        </Link>
      </div>

      <Swiper navigation>
        {salesListing &&
          salesListing.length > 0 &&
          salesListing.map((offer) => (
            <SwiperSlide key={offer._id}>
              <div
                style={{
                  background: `url(${offer.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={offer._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {salesListing && salesListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link className="text-sm text-blue-800" to={`/search?offer=true`}>
                Show More offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {salesListing.map((listing) => (
                <Listingcard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent place for rent
              </h2>
              <Link className="text-sm text-blue-800" to={`/search?type=rent`}>
                Show More place for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {offerListing.map((listing) => (
                <Listingcard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent place for sale
              </h2>
              <Link className="text-sm text-blue-800" to={`/search?type=sale`}>
                Show More sales
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {rentListing.map((listing) => (
                <Listingcard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

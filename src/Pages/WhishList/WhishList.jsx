import React, { useEffect, useState } from "react";
import Loading from "../../Component/Loading/Loading";
import { Button } from "@heroui/react";
import { clearWishList, getWishlist } from "../../Services/WishListSevices";
import { addProductCart } from '../../Services/CartServices';

export default function WishList () {
  const [addCartLoading, setaddCartLoading] = useState(false);
  const [cartId, setcartId] = useState(null);
  const [cartData, setcartData] = useState([]);
  const [numOfCrtItems, setnumOfCrtItems] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [WishListData, setsetWishListData] = useState([]);

  useEffect(() => {
    getWishlist(setisLoading, setcartId, setcartData, setnumOfCrtItems);
  }, [WishListData]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className='flex justify-between'> 
        <h1 className="mb-10 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Wish List Items <span className='text-red-500 dark:text-red-400'>({cartData?.length})</span>
        </h1>
      </div>

      {cartData?.length === 0 ? (
        <h2 className="text-center text-xl text-gray-600 dark:text-gray-300 font-semibold mt-10">
          No product in your wish list 😔
        </h2>
      ) : (
        cartData?.map((product, index) => (
          <div key={index} className="relative container justify-between items-center mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md sm:flex sm:justify-start hover:scale-105 transition-all">
            
            <Button 
              variant="flat"
              className="absolute top-2 right-2 min-w-0 px-2 bg-transparent"
              onPress={() => clearWishList(product?._id, setsetWishListData)}
              endContent={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 duration-150 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }>
            </Button>

            <img src={product?.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40 mt-3" />

            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between flex flex-col h-full">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{product?.title}</h2>
                <p className="mt-1 text-xs text-start text-gray-700 dark:text-gray-300">${product?.price}</p>
                <h2 className="my-2 text-start text-md text-gray-900 dark:text-gray-300">
                  <span className="font-bold">Category:</span> {product?.category?.name || "N/A"}
                </h2>
                <h2 className="my-2 text-start text-md text-gray-900 dark:text-gray-300">
                  <span className="font-bold">Brand:</span> {product?.brand?.name || "N/A"}
                </h2>
              </div>

              <div className="mt-auto">
                <Button 
                  onPress={() => addProductCart(product?._id, setaddCartLoading, clearWishList(product?._id, setsetWishListData))}
                  className="w-auto flex items-center justify-center rounded-md bg-slate-900 dark:bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

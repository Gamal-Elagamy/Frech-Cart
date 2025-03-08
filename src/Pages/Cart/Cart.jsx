import React, { useEffect, useState } from 'react'
import Loading from '../../Component/Loading/Loading'
import CartProduct from '../../Component/CartProduct/CartProduct';
import { clearCart, getCart } from '../../Services/CartServices';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';


export default function () {

  const [cartId, setcartId] = useState(null); 
  const [cartData, setcartData] = useState(null) 
  const [numOfCrtItems, setnumOfCrtItems] = useState(0);
  const [isLoading, setisLoading] = useState(true) 
  const [clearCartisLoading, setclearCartisLoading] = useState(false) 


  useEffect(() => {
    getCart(setisLoading, setcartId, setcartData, setnumOfCrtItems)
  }, []); 


  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div className='flex justify-between dark:text-white'> 
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items <span className='text-red-950'>({numOfCrtItems})</span></h1>

        {   
          !!numOfCrtItems &&   
          <Button isLoading={clearCartisLoading} onPress={() => clearCart(setclearCartisLoading, setcartId, setcartData, setnumOfCrtItems)} className=' text-red-800 bg-transparent min-w-4 dark:text-red-400'>Clear</Button>
        }    
      </div>

      { 
        numOfCrtItems ?
          <div className="justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {
                cartData?.products.map((product, index) => {
                  return <CartProduct
                    key={index} 
                    product={product}
                    setnumOfCrtItems={setnumOfCrtItems}
                    setcartData={setcartData}
                    setcartId={setcartId}
                  />
                })
              }
            </div>
            <div className="mt-6 sticky top-20 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 dark:bg-gray-800 dark:text-white">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700 dark:text-white">Subtotal</p>
                <p className="text-gray-700 dark:text-white">${cartData?.totalCartPrice}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700 dark:text-white">Shipping</p>
                <p className="text-gray-700 dark:text-white">$0</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold dark:text-white">Total</p>
                <div className=" ">
                  <p className="mb-1 text-lg font-bold dark:text-white">${cartData?.totalCartPrice}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">including VAT</p>
                </div>
              </div>
              <Link to={"/address/" + cartId} className="mt-6 block w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600">Check out</Link>
            </div>
          </div>
        :
        <h1 className='text-center text-xl text-gray-600 font-semibold mt-10 dark:text-gray-300'>
          No Products In Your Cart 😔
        </h1>
      }
    </>
  )
}

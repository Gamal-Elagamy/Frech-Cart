import React, { useEffect, useState } from 'react'
import { UpdateProductCount, removeCartProduct } from '../../Services/CartServices'
import { Button } from '@heroui/react'

export default function CartProduct({product, setcartId, setcartData, setnumOfCrtItems}) {
   const [isLoading, setisLoading] = useState(false)
   const [incrementLoading, setIncrementLoading] = useState(false)
   const [decrementLoading, setDecrementLoading] = useState(false)
   const [productCount, setproductCount] = useState(product.count)

   useEffect(() => {
    setproductCount(product.count)
   }, [product.count])

  return (
    <div className="justify-between items-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start hover:scale-x-105 hover:scale-y-105 transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700 border-2 border-gray-200 relative">
      <Button 
        isLoading={isLoading} 
        variant='flat' 
        className='absolute top-0 right-0 min-w-0 px-2  bg-transparent' 
        onPress={() => removeCartProduct(product.product._id, setcartId, setcartData, setnumOfCrtItems, setisLoading)} 
        endContent={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 duration-150 hover:text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        }
      />
      
      <img src={product.product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{product.product.title}</h2>
          <p className="mt-1 text-xs text-start text-gray-700 dark:text-gray-300">${product.price}</p>
          <h2 className="my-2 text-start text-md text-gray-900 dark:text-white">
            <span className='font-bold'>Category:</span>{product.product.category.name}
          </h2>
          <h2 className="my-2 text-start text-md text-gray-900 dark:text-white">
            <span className='font-bold'>Brand:</span>{product.product.brand.name}
          </h2>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-stretch border-gray-100">
            <Button 
              isLoading={decrementLoading} 
              isDisabled={product.count == 1}
              onPress={() => 
                UpdateProductCount(
                  product.product._id, 
                  product.count - 1, 
                  product.count, 
                  setcartData,       
                  setnumOfCrtItems,   
                  setIncrementLoading, 
                  setDecrementLoading
                )
              }
              className="min-w-4 rounded-none p-0 rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 dark:bg-gray-700 dark:hover:bg-blue-500"
            >
              - 
            </Button>
            <input 
              value={productCount}
              min={1} 
              onBlur={(e) => 
                Number(e.target.value) != product.count &&
                UpdateProductCount(
                  product.product._id, 
                  Number(e.target.value), 
                  product.count, 
                  setcartData,        
                  setnumOfCrtItems,   
                  setIncrementLoading, 
                  setDecrementLoading
                )
              } 
              onChange={(e) => setproductCount(e.target.value)} 
              className="w-8 border bg-white text-center text-xs outline-none dark:bg-gray-700 dark:text-white" 
              type="number" 
            />
            <Button 
              isLoading={incrementLoading} 
              onPress={() => 
                UpdateProductCount(
                  product.product._id, 
                  product.count + 1, 
                  product.count, 
                  setcartData,        
                  setnumOfCrtItems,   
                  setIncrementLoading, 
                  setDecrementLoading
                )
              }
              className="min-w-4 rounded-none p-0 rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 dark:bg-gray-700 dark:hover:bg-blue-500"
            > 
              + 
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm dark:text-white">${product.count * product.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

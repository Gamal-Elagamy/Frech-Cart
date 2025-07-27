import axios from 'axios'
import React, { Component, useEffect, useState } from 'react'
import Loading from '../../Component/Loading/Loading'
import Product from '../../Component/Product/Product'
import { Link } from 'react-router-dom';

export default function Home() {
 const [products, setproducts] = useState([])
 const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    grtAllProducts()
  }, [])
  
  async function grtAllProducts(){
    setisLoading(true)
    const{ data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    setproducts(data.data); 
    setisLoading(false)
  } 

  if(isLoading){
   return <Loading/>
  }

  return (
  <>
      
      <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
      {
        products.map((product, index)=>{
          return <Product product= {product} key= {index}/>
        })
      }
    </div>

    <div className='mt-8'>
  {location.pathname !== "/" && (
    <Link to="/" className="text-blue-500 hover:text-blue-700 border-2 border-blue-500 px-3 py-1 rounded-lg">
      Previous
    </Link>
  )}
  {location.pathname !== "/Home2" && (
    <Link to="/Home2" className="text-blue-500 hover:text-blue-700 border-2 border-blue-500 px-3 py-1 rounded-lg">
      Next
    </Link>
  )}
</div>
  </>
  )
}

import axios from 'axios'
import React, { Component, useEffect, useState } from 'react'
import Loading from '../../Component/Loading/Loading'
import Product from '../../Component/Product/Product'
import { Button } from '@heroui/react'
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
      
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
      {
        products.map((product, index)=>{
          return <Product product= {product} key= {index}/>
        })
      }
    </div>

    <div className='mt-5'>
        {location.pathname !== "/" && (
          <Link to="/">
            <Button className='me-3' type='button' color='primary' variant='flat'>Previous</Button>
          </Link>
        )}
        {location.pathname !== "/Home2" && (
          <Link to="/Home2">
            <Button type='button' color='primary' variant='flat'>Next</Button>
          </Link>
        )}
      </div>
  </>

  )
  
}

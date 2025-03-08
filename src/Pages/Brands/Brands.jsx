import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from '../../Component/Loading/Loading'

export default function Brands() {
  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
 const {data, isLoading} = useQuery({

  queryKey : ["brands"],
  queryFn : getAllBrands,
  select: (data)=> data.data.data,
  refetchOnReconnect:true
 })

    if (isLoading) {
      return <Loading />
    }

  return (
    <>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.map((brands, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
          <img className="w-full " src={brands.image}alt={brands.name} />     
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{brands.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

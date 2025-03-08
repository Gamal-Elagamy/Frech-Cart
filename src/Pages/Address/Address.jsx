import { Input, Button } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from "yup"

export default function Address() {
  
  const [isLoading, setIsLoading] = useState(false);
  const {cartId}= useParams();
  console.log(cartId);

  const initialValues = {
    details: "",
    phone: "+20",
    city: "", 
    }

    async function chekOut(){
      setIsLoading(true)
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      {shippingAddress:values},
      { headers:{token:localStorage.getItem("token")},
      params:{url:"http://localhost:5173"} } 
      )
      setIsLoading(false)
      location.href= data.session.url
    }

    const validationSchema = Yup.object({
      details: Yup.string().required("details Is Rquired"),
      phone: Yup.string().required("accept only egypt phone numbers"),
      city: Yup.string().required("city Is Rquired"),
    })

        const{handleSubmit, values, handleChange, 
        errors, handleBlur, touched} = useFormik({
      initialValues,
      onSubmit :chekOut,
      validationSchema
    })


  return (
    <>
    <h1>Details</h1>
    <div className=' my-10'>
    <form onSubmit={handleSubmit}>
      <div className=' w-11/12  sm:w-2/3 mx-auto grid py-15 gap-4'>
       <Input  isInvalid = {touched.details && errors.details } errorMessage={errors.details} onBlur={handleBlur} onChange={handleChange} value={values.details} name='details' variant='bordered' label="Details" type='text'/>
       <Input  isInvalid = {touched.phone && errors.phone } errorMessage={errors.phone} onBlur={handleBlur} onChange={handleChange} value={values.phone} name='phone' variant='bordered' label="Phone" type='tel'/>
        <Input  isInvalid = {touched.city && errors.city } errorMessage={errors.city} onBlur={handleBlur} onChange={handleChange} value={values.city} name='city' variant='bordered' label="City" type='text'/>
        <Button isLoading = {isLoading} type='submit' color='primary'>
          Place Order
        </Button>
      </div>
      </form>
    </div> 
    </>
  )
}

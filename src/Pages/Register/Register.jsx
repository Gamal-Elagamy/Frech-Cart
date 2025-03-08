import { Input, Button } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function Register() {
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [ErrorMsg, setErrorMsg] = useState("")

  const initialValues = {
    name: "",
    email : "",
    password: "",
    rePassword: "",
    phone: "+20",
    }

    const onSubmit =  ()=>{
    setErrorMsg("");
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    .then((res)=>{
      navigate("/login")
    })
    .catch((err)=>{
      setErrorMsg(err.response.data.message)
    })
    .finally(()=>{
      setIsLoading(false)
    })
    }

    const validationSchema = Yup.object({
      name: Yup.string().required("Name Is Rquired").min(3, "name length must be more than 2 characters").max(30, " name length must be less than 21 characters"),
      email: Yup.string().required("Invalid email"),
      password: Yup.string().required("must be at least 6 chars"),
      rePassword: Yup.string().required().oneOf([Yup.ref("password")], "Password confirmation is incorrect"),
      phone: Yup.string().required("accept only egypt phone numbers")
    })
        const{handleSubmit, values, handleChange, 
        errors, handleBlur, touched} = useFormik({
      initialValues,
      onSubmit,
      validationSchema
    })


  return (
    <>
    <div className=' my-10'>
    <form onSubmit={handleSubmit}>
      <div className=' w-2/3 mx-auto grid grid-cols-2 gap-4'>
       <Input className='col-span-2' isInvalid = {touched.name && errors.name } errorMessage={errors.name} onBlur={handleBlur} onChange={handleChange} value={values.name} name='name' variant='bordered' label="name" type='name'/>
        <Input className='col-span-2' isInvalid = {touched.email && errors.email } errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant='bordered' label="email" type='email'/>
        <Input className='col-span-1' isInvalid = {touched.password && errors.password } errorMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' variant='bordered' label="password" type='password'/>
        <Input className='col-span-1' isInvalid = {touched.rePassword && errors.rePassword } errorMessage={errors.rePassword} onBlur={handleBlur} onChange={handleChange} value={values.rePassword} name='rePassword' variant='bordered' label="rePassword" type='password'/>
        <Input className='col-span-2' isInvalid = {touched.phone && errors.phone } errorMessage={errors.phone} onBlur={handleBlur} onChange={handleChange} value={values.phone} name='phone' variant='bordered' label="Phone" type='tel'/>
        <Button isLoading = {isLoading} type='submit' className=' col-span-2' color='primary'>
          Register
        </Button>
        { ErrorMsg && <p className=' text-red-700'>{ErrorMsg}</p>}
      </div>
      </form>
    </div> 
    </>
  )
}

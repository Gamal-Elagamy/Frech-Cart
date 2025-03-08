import { Input, Button } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { authcontext } from '../../Context/AuthContext'

export default function ResetPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")
    const{setIsLoggedIn} = useContext(authcontext)
  
    const initialValues = {
      email : "",
      newPassword: "",
      }
      const onSubmit =  ()=>{
        setErrorMsg("");
        setIsLoading(true);
        axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
        .then((res)=>{
          localStorage.setItem("token", res.data.token)
          setIsLoggedIn(true) 
          navigate("/")
        })
        .catch((err)=>{
          setErrorMsg(err.response.data.message)
        })
        .finally(()=>{
          setIsLoading(false)
        })
        }
  
      const validationSchema = Yup.object({
        email: Yup.string().required("Invalid email"),
        newPassword: Yup.string().required("must be at least 6 chars"),
      })
  
      const{handleSubmit, values, handleChange, 
        errors, handleBlur, touched} = useFormik({
        initialValues,
        onSubmit,
        validationSchema
      })
  
  return (
    <div className=' my-10'>
    <form onSubmit={handleSubmit}>
      <div className=' w-2/3 mx-auto grid grid-cols-2 gap-4'>
      <Input className='col-span-2' isInvalid = {touched.email && errors.email } errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant='bordered' label="email" type='email'/>
      <Input className='col-span-2' isInvalid = {touched.newPassword && errors.newPassword } errorMessage={errors.newPassword} onBlur={handleBlur} onChange={handleChange} value={values.newPassword} name='newPassword' variant='bordered' label="newPassword" type='password'/>
        <Button isLoading = {isLoading} type='submit' className=' col-span-2' color='primary'>
        Reset Password
        </Button> 
        { ErrorMsg && <p className=' text-red-700'>{ErrorMsg}</p>}
      </div>
      </form>
    </div> 
  )
}

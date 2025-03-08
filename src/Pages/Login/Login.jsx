import { Input, Button } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { authcontext } from '../../Context/AuthContext'

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")
    const{setIsLoggedIn} = useContext(authcontext)
  
    const initialValues = {
      email : "",
      password: "",
      }
      const onSubmit =  ()=>{
        setErrorMsg("");
        setIsLoading(true);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
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
        password: Yup.string().required("must be at least 6 chars"),
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
      <Input className='col-span-2' isInvalid = {touched.password && errors.password } errorMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' variant='bordered' label="password" type='password'/>
        <Button isLoading = {isLoading} type='submit' className=' col-span-2' color='primary'>
          Login
        </Button> 
     <div className=' text-center w-6/12 m-auto'>
     <Link to={"/ForgotPassword"}>Forgot Password ?</Link>
     </div>
        { ErrorMsg && <p className=' text-red-700'>{ErrorMsg}</p>}
      </div>
      </form>
    </div> 
  )
}

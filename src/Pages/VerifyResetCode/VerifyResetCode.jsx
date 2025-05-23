import { Input, Button } from '@heroui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function VerifyResetCode() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")
  
    const initialValues = {
        resetCode : "",
      }
      const onSubmit =  ()=>{
        setErrorMsg("");
        setIsLoading(true);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
        .then((res)=>{
          navigate("/ResetPassword")
        })
        .catch((err)=>{
          setErrorMsg(err.response.data.message)
        })
        .finally(()=>{
          setIsLoading(false)
        })
        }
  
      const validationSchema = Yup.object({
        resetCode: Yup.string().required("must not be empty"),
      })
  
      const{handleSubmit, values, handleChange, 
        errors, handleBlur, touched} = useFormik({
        initialValues,
        onSubmit,
        validationSchema
      })
  
  return (
    <div className='bg-danger-50 my-10'>
    <form onSubmit={handleSubmit}>
      <div className=' grid grid-cols-2 gap-4'>
      <Input className='col-span-2' isInvalid = {touched.resetCode && errors.resetCode } errorMessage={errors.resetCode} onBlur={handleBlur} onChange={handleChange} value={values.resetCode} name='resetCode' variant='bordered' label="resetCode" type='text'/>
        <Button isLoading = {isLoading} type='submit' className=' col-span-2' color='primary'>
        Verify
        </Button> 
        { ErrorMsg && <p className=' text-red-700'>{ErrorMsg}</p>}
      </div>
      </form>
    </div> 
  )
}

import React, { useContext } from 'react'
import { authcontext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuthRoute({children}) {
    // هنا الداتا الى عاملينها shared على البروجيكت كله
    const {IsLoggedIn} = useContext(authcontext)
  return (
     <>
            {/* لو اليوزر عامل login مينفعش يروح للlogin & sing up بنوديه لل home */}
           { IsLoggedIn ? <Navigate to={"/"}/> : children }
    </>
  )
}

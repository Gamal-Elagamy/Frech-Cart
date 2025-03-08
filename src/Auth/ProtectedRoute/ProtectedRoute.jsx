import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authcontext } from '../../Context/AuthContext';

//  ده عشان نحمى بيه البروجيكت بتاعتنا مش اى حد يدخل كده ويغير اللينك ويكتب اسم صفحه فيروح لها الدنيا مش سايبه
export default function ProtectedRoute({children}) {
   // هنا الداتا الى عاملينها shared على البروجيكت كله
  //  const{IsLoggedIn} = useContext(authcontext)  
  return (
    <>
      { 
      // هنا لو عامل login يقدر يغير فى path ويروح للصفحه اللى عايزها لكن لو مش عامل نوديه لل login
          // IsLoggedIn ? children: <Navigate to={"/login"}/>
      }
    {/* دى طريقه تانيه نعمل بيها check ان اليوزر عامل login فنوديه للمكان اللى عايزه */}
     {localStorage.getItem("token") != null ? children : <Navigate to={"/login"}/>}
    </>
  )
}

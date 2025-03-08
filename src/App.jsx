import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './Layouts/Layout/Layout'
import Home from './Pages/Home/Home'
import {HeroUIProvider} from '@heroui/react'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import NotFound from './Pages/NotFound/NotFound'
import Categories from './Pages/Categories/Categories'
import Brands from './Pages/Brands/Brands'
import Cart from './Pages/Cart/Cart'
import ProtectedRoute from './Auth/ProtectedRoute/ProtectedRoute'
import AuthContextProvider from './Context/AuthContext'
import ProtectedAuthRoute from './Auth/ProtectedRoute/ProtectedAuthRoute'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify';
import Address from './Pages/Address/Address'
import Orders from './Pages/Orders/Orders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Home2 from './Pages/Home2/Home2'
import WhishList from './Pages/WhishList/WhishList'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import VerifyResetCode from './Pages/VerifyResetCode/VerifyResetCode'
import { DarkModeProvider } from './Context/DarkModeContext'

 const queryClient = new QueryClient()


function App() {

 const router = createBrowserRouter([
    {
      path : '', element : <Layout/>, children : [
        { index: true , element : <ProtectedRoute><Home/></ProtectedRoute> },
        {path: 'register', element: <ProtectedAuthRoute><Register/></ProtectedAuthRoute>},
        {path: 'Home2', element: <ProtectedRoute><Home2/></ProtectedRoute>},
        {path: 'login', element:<ProtectedAuthRoute><Login/></ProtectedAuthRoute>},
        {path: 'Categories', element: <ProtectedRoute><Categories/></ProtectedRoute>},
        {path: 'Brands', element: <ProtectedRoute><Brands/></ProtectedRoute>},
        {path: 'Cart', element: <ProtectedRoute><Cart/></ProtectedRoute>},
        {path: 'WhishList', element: <ProtectedRoute><WhishList/></ProtectedRoute>},
        {path: 'allorders', element: <ProtectedRoute><Orders/></ProtectedRoute>},
        {path: 'address/:cartId', element: <ProtectedRoute><Address/></ProtectedRoute>},
        {path: 'ProductDetails/:id', element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
        {path:"ForgotPassword", element: <ForgotPassword/>},
        {path:"VerifyResetCode", element: <VerifyResetCode/>},
        {path:"ResetPassword", element: <ResetPassword/>},
        {path: "*", element:<NotFound/>}
      ]
    }
  ])

  return (
    <>
        <DarkModeProvider>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <HeroUIProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools/>
          <ToastContainer/>
      </HeroUIProvider>  
      </AuthContextProvider>
    </QueryClientProvider>
    </DarkModeProvider>
    </>
  )
}

export default App

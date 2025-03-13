import axios from 'axios'
import { useEffect, useState } from 'react'
import { formatDate } from '../../Services/Helpers/Date'
import Loading from '../../Component/Loading/Loading'
import pic from '../../../public/gimy.jpg'

export default function Orders() {
  const [orders, setorders] = useState([])
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    getUserId()
  }, [])

  async function getUserId() {
    setisLoading(true)
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      {
        headers: { token: localStorage.getItem("token") }
      }
    )
    setisLoading(false)
    grtUserOrder(data.decoded.id)
  }

  async function grtUserOrder(userId) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    setorders(data)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
    <div className="flex justify-between">
      <h1 className="mb-10 text-center text-2xl font-bold text-gray-900 dark:text-white">
        Orders <span className='text-red-500 dark:text-red-400'>({orders?.length})</span>
      </h1>
    </div><div className="grid gap-3">
        {
          orders.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-800 dark:text-white">
              You haven't requested any orders yet 😔
            </div>
          ) : (
            orders.map((order, index) => {
              return (
                <div key={index} className="pb-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                  <div className="flex justify-start item-start space-y-2 flex-col ">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white">
                      Order {order.id}
                    </h1>
                    <p className="text-base font-medium leading-6 text-gray-600 dark:text-gray-400">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                      <div className="flex flex-col justify-start items-start bg-gray-50 dark:bg-gray-800 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-lg">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800 dark:text-white">Customer’s Cart</p>
                        {order.cartItems.map((cartItem, index) => {
                          return (
                            <div key={index} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full hover:scale-x-105 hover:scale-y-105 transition-all rounded-lg">
                              <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-full rounded-lg" src={cartItem.product.imageCover} alt={cartItem.product.title} />
                              </div>
                              <div className="border-b border-gray-200 dark:border-gray-600 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0 rounded-lg">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                  <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800 dark:text-white">{cartItem.product.title}</h3>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                  <p className="text-base xl:text-lg leading-6">
                                    $ {cartItem.price} <span className="text-red-300 line-through"> $ {cartItem.price + 100}</span>
                                  </p>
                                  <p className="text-base xl:text-lg leading-6 text-gray-800 dark:text-gray-300">{cartItem.count}</p>
                                  <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800 dark:text-white">$ {cartItem.price * cartItem.count}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 rounded-lg">
                          <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-white">Summary</h3>
                          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                            <div className="flex justify-between w-full">
                              <p className="text-base leading-4 text-gray-800 dark:text-white">Subtotal</p>
                              <p className="text-base leading-4 text-gray-600 dark:text-gray-300">${order.totalOrderPrice}</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                              <p className="text-base leading-4 text-gray-800 dark:text-white">Shipping</p>
                              <p className="text-base leading-4 text-gray-600 dark:text-gray-300">$0</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <p className="text-base font-semibold leading-4 text-gray-800 dark:text-white">Total</p>
                            <p className="text-base font-semibold leading-4 text-gray-600 dark:text-gray-300">${order.totalOrderPrice}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col rounded-lg">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-white">Customer</h3>
                      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                          <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200 dark:border-gray-600">
                            {/* <img src={pic} className='w-40 rounded-full' alt="avatar" /> */}
                            <div className="flex justify-start items-start flex-col space-y-2">
                              <p className="text-base font-semibold leading-4 text-left text-gray-800 dark:text-white">{order.user.name}</p>
                            </div>
                          </div>

                          <div className="flex justify-center md:justify-start items-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-600 w-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="cursor-pointer text-sm leading-5 text-gray-800 dark:text-gray-400">{order.user.email}</p>
                          </div>
                        </div>
                        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                              <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800 dark:text-white">Phone Number</p>
                              <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 dark:text-gray-400">{order.user.phone}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
      </div></>
  )
}

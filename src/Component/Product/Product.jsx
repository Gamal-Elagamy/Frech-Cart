import { Button } from '@heroui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addProductCart } from '../../Services/CartServices';
import { addProductWishList } from '../../Services/WishListSevices';

export default function Product({ product }) {
    const [addCartLoading, setAddCartLoading] = useState(false);
    const [addProductWishListLoading, setAddWishListLoading] = useState(false);
    const [addedToWishlist, setAddedToWishlist] = useState(false);

    const handleAddToWishlist = () => {
        addProductWishList(product._id, setAddWishListLoading);
        setAddedToWishlist(true);
    };

    return (
        <div className="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:scale-105 transition-all dark:bg-gray-900 dark:border-gray-700">
            
            <Link to={"/ProductDetails/" + product._id} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <img className="object-cover rounded mx-auto" src={product.imageCover} alt="product image" />
                {product.priceAfterDiscount &&
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        {(100 - (product.priceAfterDiscount * 100 / product.price)).toFixed(0)}% OFF
                    </span>
                }
            </Link>

            <div className="mt-4 px-5 pb-5">
                <Link to={"/ProductDetails/" + product._id}>
                    <h5 className="text-xl tracking-tight text-slate-900 dark:text-white line-clamp-1">{product.title}</h5>
                </Link>

                <div className="mt-2 mb-5 flex flex-col items-center justify-between">
                    
                    {product.priceAfterDiscount ? (
                        <div>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">${product.priceAfterDiscount}</p>
                            <p className="text-sm text-slate-900 dark:text-gray-400 line-through">${product.price}</p>
                            <p className="text-sm text-red-500 dark:text-red-400">⏳ Limited-time offer: Starts tomorrow!</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">${product.price}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">🚀 Exciting offers are coming soon! 🔥</p>
                        </div>
                    )}

                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <svg key={rate} aria-hidden="true" className={`h-5 w-5 ${rate <= product.ratingsAverage ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="mr-2 ml-3 rounded bg-yellow-200 dark:bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold text-black dark:text-white">
                            {product.ratingsAverage}
                        </span>
                    </div>
                </div>

                <Button
                    isLoading={addCartLoading}
                    onPress={() => addProductCart(product._id, setAddCartLoading)}
                    className="w-full mb-2 flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md 
                    bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l1 5h13l1-5h2M7 13h10l1-5H6l1 5zm5 8a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4zm16 0a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Add to Cart
                </Button>

                <Button
                    isLoading={addProductWishListLoading}
                    onPress={handleAddToWishlist}
                    className={`w-full flex gap-2 items-center px-5 py-2.5 text-center text-sm font-medium rounded-md
                    ${addedToWishlist ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`mr-2 h-6 w-6 ${addedToWishlist ? 'text-white' : 'text-gray-800 dark:text-gray-300'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                    </svg>
                    Wishlist
                </Button>

            </div>
        </div>
    )
}

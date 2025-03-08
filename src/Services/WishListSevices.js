import axios from "axios";
import { Bounce, toast } from "react-toastify";

    export async function addProductWishList(productId, setaddWishListLoading){
        setaddWishListLoading(true)
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", 
        {productId },
        {headers:{ token: localStorage.getItem("token")}})

        setaddWishListLoading(false)
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }

  export async function getWishlist(setisLoading, setcartId, setcartData, setnumOfCrtItems){
    setisLoading(true)
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
    {headers: {token:localStorage.getItem("token")}});
    setcartId(data.cartId);
    setcartData(data.data);
    setnumOfCrtItems(data.numOfCartItems);
    setisLoading(false)
  }

  export async function clearWishList(productId, setWishListData){
    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {headers:{token: localStorage.getItem("token")}})
    setWishListData(data.data);
        toast.warning(data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
}
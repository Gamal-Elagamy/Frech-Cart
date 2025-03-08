import axios from "axios";
import { Bounce, toast } from "react-toastify";


 export async function addProductCart(productId, setaddCartLoading){
    setaddCartLoading(true)
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", 
    {productId },
    {headers:{ token: localStorage.getItem("token")}})
    setaddCartLoading(false)
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

  export async function getCart(setisLoading, setcartId, setcartData, setnumOfCrtItems){
    setisLoading(true)
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
    {headers: {token:localStorage.getItem("token")}});
    setcartId(data.cartId);
    setcartData(data.data);
    setnumOfCrtItems(data.numOfCartItems);
    setisLoading(false)
  }

  export async function removeCartProduct(productId, setcartId, setcartData, setnumOfCrtItems, setisLoading){
    setisLoading(true)
    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {headers:{token: localStorage.getItem("token")}})
    setisLoading(false);
    setcartId(data.cartId);
    setcartData(data.data);
    setnumOfCrtItems(data.numOfCartItems);
}

  export async function clearCart(setisLoading, setcartId, setcartData, setnumOfCrtItems){
    setisLoading(true)
    const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",
    {headers:{token: localStorage.getItem("token")}})
    setisLoading(false);
    setcartId(null);
    setcartData(null);
    setnumOfCrtItems(null);
  }

    export async function UpdateProductCount (productId, count, currentCount, setcartData, setnumOfCrtItems, setIncrementLoading, setDecrementLoading){
      if(currentCount < count){
        setIncrementLoading(true)
      };
      if(currentCount > count){
        setDecrementLoading(true)
      };

      const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {count},
      {headers:{token:localStorage.getItem("token")}})
      setIncrementLoading(false)
      setDecrementLoading(false)
      setcartData(data.data);
      setnumOfCrtItems(data.numOfCartItems)
      }
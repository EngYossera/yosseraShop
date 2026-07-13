import { authOptions } from "@/auth";
import Cart from "@/components/Cart/Cart";
import { CartResponse } from "@/inrerfaces/CartInterfaces";
import { getServerSession } from "next-auth";

export default async function cartpage(){
  const session = await getServerSession(authOptions);

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
    headers:{
      token:session?.token as string
    }
  });
  const data: CartResponse= await response.json();


    return<>
  <Cart cartData={data?.numOfCartItems ==0? null: data} />
    </>}
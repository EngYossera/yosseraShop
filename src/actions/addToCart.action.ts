"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { ShippingAddress } from "@/inrerfaces/CartInterfaces";



export async function checkOutAction(cartId: string ,shippingAddress:ShippingAddress){
  const session=await getServerSession(authOptions);
if(session){
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
    method: "POST",
   
    headers: {
      token:     session?.token as string,
      "Content-Type": "application/json",
    },
     body: JSON.stringify({ shippingAddress })
    
    
      });
      const data= await response.json();
 
      return data;}
      else
      {
        return null;
      }
}

export async function addToCartAction(productId: string){
  const session=await getServerSession(authOptions);
if(session){
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token:     session?.token as string,
      "Content-Type": "application/json",
    }
    
    
      });
      const data= await response.json();
      return data;}
      else
      {
        return null;
      }
}

// Some catalog backends remove a saved item after it is moved to the cart.
// This action is used only from the wishlist to preserve the user's saved item.
export async function addWishlistProductToCartAction(productId: string) {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const headers = {
    token: session.token as string,
    "Content-Type": "application/json",
  };

  const cartResponse = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers,
  });

  const cartData = await cartResponse.json();

  if (cartResponse.ok) {
    await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers,
    });
  }

  return cartData;
}

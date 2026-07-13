"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function updateProductAction(productId: string ,count:number) {
const session = await getServerSession(authOptions);
const response=await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,
  {
method:'PUT',
headers:{
  token:session?.token as string,

  "Content-Type": "application/json"
  }
,
body:JSON.stringify({count})}
);
const data=await response.json();
console.log(data)
console.log(count)
return data;


}

export async function deletaProductAction(productId: string) {
const session = await getServerSession(authOptions);
const response=await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,
  {
method:'DELETE',
headers:{
  token:session?.token as string,
  }}
);
const data=await response.json();
return data;


}

export async function clearCartAction() {
const session = await getServerSession(authOptions);
const response=await fetch('https://ecommerce.routemisr.com/api/v1/cart',
  {
method:'DELETE',
headers:{
  token:session?.token as string,
  }}
);
const data=await response.json();
return data;


}

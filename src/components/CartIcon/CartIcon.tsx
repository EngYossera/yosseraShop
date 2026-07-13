"use client"


import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartIcon({serverCartNumber,cartId}:{serverCartNumber:number,cartId:string}){
    localStorage.setItem("cartId",cartId);
      const[cartNumber,setCartNumber] =useState(serverCartNumber);
    useEffect(()=>{
        function handler(e:CustomEvent){
            setCartNumber(e.detail);
            
        }
        window.addEventListener("cartUpdate",handler as EventListener)
    },[])
    return<>
    
                
                     <Link href="/pages/Cart"  className="relative pointer-coarse:">
                    <ShoppingCartIcon/>
                    <span className="absolute -top-2 inset-s-5/6 size-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-white">
                        {cartNumber}</span>

                    </Link>
                              
                    
    </>
}
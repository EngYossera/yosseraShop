
"use client"
import { useEffect } from "react";

 export default function AllOrder() {
    async function getOrders() {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/`+localStorage.getItem('cardId'));
        const data = await response.json();
       
    }
    useEffect(()=>{
        getOrders()
    },[])
    return <div>   
        <h1>AllOrder</h1>
        
    </div>
}
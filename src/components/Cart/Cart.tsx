'use client';

import Image from "next/image";
import Link from "next/link";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { CartResponse } from "@/inrerfaces/CartInterfaces";
import { useEffect, useState } from "react";
import { clearCartAction, deletaProductAction, updateProductAction } from "@/actions/cart.action";
import toast from "react-hot-toast";
import CheckOutSession from "../checkOutSession/checkOutSession";






export default function Cart({cartData}:{cartData : CartResponse | null}) {
  const [cart,setCart]=useState<CartResponse | null>(cartData ||null);
  const [isLoadingId,setIsLoadingId]=useState<null | string>(null);

  // Keep the navbar badge in sync with the current client-side cart state.
  // Dispatching during render used the original server value again after a deletion.
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('cartUpdate', { detail: cart?.numOfCartItems ?? 0 }),
    );
  }, [cart]);


    async function updateProduct(productId:string ,count:number){
    setIsLoadingId(productId);
    const response:CartResponse=await updateProductAction(productId ,count);
    if(response.status=='success'){
      
      setCart(response);
      toast.success('product count updated')
    }
    setIsLoadingId(null);
  }

  async function deleteProduct(productId:string){
    setIsLoadingId(productId);
    const response:CartResponse=await deletaProductAction(productId);
    if(response.status=='success'){
      setCart(response);
   
    } 
    setIsLoadingId(null);
  }
  async function clearCart(){
    setIsLoadingId('clear');
    const response:CartResponse=await clearCartAction();
    if(response.message=='success'){
      setCart(null);
    }
    setIsLoadingId(null);
  }

  return <>
    {cart?
    <main className="space-y-6 pb-8">
      
        <div>
          <h1 className="text-3xl font-bold tracking-normal">shopping Cart</h1>
        <p className="mt-1 text-sm text-muted-foreground">{cart.numOfCartItems} items in your cart</p>
        </div>
      

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className=" space-y-4">
      {
        cart.data.products.map((item)=><article key={item._id} className="relative grid gap-4 rounded-md border bg-white p-4 shadow-sm sm:grid-cols-[110px_1fr_auto] sm:items-center">
        { isLoadingId == item.product.id &&
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <Loader2 className="animate-spin" />
          </div>
}
              <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-100">
                <Image src={item.product.imageCover} alt={item.product.title} fill sizes="110px" className="object-cover" />
              </div>

              <div className="min-w-0 space-y-3">
                <div>
                  <h2 className="line-clamp-1 text-lg font-semibold">{item.product.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.product.brand.name} · {item.product.category.name}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button disabled={item.count==1}
                   onClick={()=>updateProduct(item.product._id,item.count-1)}  className="flex size-8 items-center justify-center rounded-md border text-zinc-700 transition hover:bg-zinc-50" aria-label="Decrease quantity">
                    <Minus className="size-4" />
                  </button>
                  <span  className="flex size-8 items-center justify-center text-sm font-semibold">
                    {item.count}</span>
                  <button   disabled={item.count==item.product.quantity } onClick={()=>updateProduct(item.product._id,item.count+1)} className="flex size-8 items-center justify-center rounded-md border text-zinc-700 transition hover:bg-zinc-50" aria-label="Increase quantity">
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(item.price)}</p>
                  
                  <p className="text-xs text-muted-foreground">each</p>
                </div>
                <button className="text-sm font-medium text-red-600 
                transition hover:text-red-700" 
                onClick={() => deleteProduct(item.product.id)}>Remove</button>
              </div>
            </article>
        )
      }
        </div>




















        

        <aside className="h-fit rounded-md border bg-white p-5 shadow-sm lg:sticky lg:top-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4 text-muted-foreground">
              <span>{formatCurrency(cart.data.totalCartPrice)}</span>

              <span className="font-medium text-zinc-950">
                {formatCurrency(cart.data.totalCartPrice)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-muted-foreground">
              <span>Shipping</span>
              <span className="font-medium text-emerald-800 text-xl">Free</span>
            </div>
            <div className="flex items-center justify-between 
            gap-4 border-t pt-4 text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(cart.data.totalCartPrice)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button asChild variant="outline" className="w-full">
              <Link href="/pages/products">Continue Shopping</Link>
            </Button>
          <CheckOutSession cartId={cartData?.cartId ?? ''}/>
          </div>

          <div className="mt-5 flex justify-end">
            <button onClick={()=>clearCart()} 
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700">
          
              {isLoadingId=='clear' &&
              <Loader2  className="animate-spin"/>}
              clear cart
            </button>
          </div>
        </aside>
      </section>




      
    </main>
    
    :
    <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
      <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      <p className="text-sm text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
      <Button >
        <Link href="/pages/products">Continue Shopping</Link>
      </Button>



    </div>
    }
   
  </>
}

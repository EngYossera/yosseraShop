import { ProductsResponse } from "@/inrerfaces/productsInterfaces";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Heart, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";
import { formatCurrency } from "@/Helpers/formatCurrency";




export default async function products({ searchParams }: { searchParams: { category?: string; brand?: string } }) {
  const category = searchParams.category;
  const brand = searchParams.brand;
  const filters = new URLSearchParams();

  if (category) filters.set("category", category);
  if (brand) filters.set("brand", brand);

  const productsUrl = `https://ecommerce.routemisr.com/api/v1/products${filters.size ? `?${filters.toString()}` : ""}`;
  const response = await fetch(productsUrl);
  const data:ProductsResponse = await response.json();

  return<>

{(category || brand) && <Link href="/pages/products" className="inline-flex rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100">View all products</Link>}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
  {data.data.map((product) => (<div key={product._id} className="p-2">
   
    
    <Card className="overflow-hidden pt-0 ">
   <Link href={`/pages/products/${product._id}`}>
     <div className="-m-1 -mt-6">
       <Image 
       src={product.imageCover} alt={product.title } width={200} height={150} className="relative z-20 w-full object-cover" />

     </div>
  <CardHeader className='mt-3'>
    <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle className="line-clamp-1">{product.title}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
   <div className="flex j">
   <Star className="fill-amber-400 text-amber-400" fill="true" />
    <Star className="fill-amber-400 text-amber-400" fill="true" />
     <Star className="fill-amber-400 text-amber-400" fill="true" />
      <Star className="fill-amber-400 text-amber-400" fill="true" />
       <StarHalf className="fill-amber-400 text-amber-400" fill="true" />
   </div>
     <p>{product.ratingsAverage}</p>
     <p>{formatCurrency(product.price)}</p>
  </CardContent>
   </Link>
<AddToCart productId={product._id} />
</Card> 
  
  </div>))}

</div>
  </>
}

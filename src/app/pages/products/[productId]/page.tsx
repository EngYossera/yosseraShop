
import { Product } from "@/inrerfaces/productsInterfaces";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, StarHalf,Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Slider from "@/components/Slider/Slider";
import AddToCart from "@/components/AddToCart/AddToCart";
import { formatCurrency } from "@/Helpers/formatCurrency";

export default async function ProductDetail({params} : {params:{productId:string}}){
    const {productId}= params;
   const response = await fetch(`${process.env.BASE_URL}/products/${productId}`);
   const {data:product}:{data:Product} = await response.json();
   console.log(product);
    return<>
   <Card className="grid grid-cols-1 md:grid-cols-3 items-center ">
    <div className="">
      <Slider images={product.images} title={product.title}/>
    </div>
<div className="col-span-2  space-y-4 p-4">
 <CardHeader className='mt-3'>
    <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle className="">{product.title}</CardTitle>
      <CardAction>{product.category.name}</CardAction>
    <CardDescription>{product.description}</CardDescription>
  
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
     <p>{formatCurrency(product.price)} </p>
  </CardContent>
 <AddToCart productId={product._id} />
</div>
    </Card>
    </>
    
    }
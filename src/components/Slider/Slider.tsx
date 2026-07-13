"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
export default function Slider({images,title}:{images:string[],title:string}){
    return<>
     <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
  <CarouselContent>
 
  {images.map((img ,index)=>
   <CarouselItem key={index}><Image src={img} alt={title} width={500} height={500} className="w-full"/></CarouselItem>
)}

  </CarouselContent>
  
</Carousel>

    </>
}
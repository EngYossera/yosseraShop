import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, ShoppingBag, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Product } from "@/inrerfaces/productsInterfaces";

type HeroProps = {
  product?: Product;
};

export default function Hero({ product }: HeroProps) {
  const image = product?.imageCover || "https://ecommerce.routemisr.com/Route-Academy-products/1680402563605-cover.jpeg";

  return (
    <section className="relative isolate min-h-[430px] overflow-hidden bg-zinc-950 text-white">
      <Image
        src={image}
        alt={product?.title || "ShopMart featured product"}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-zinc-950/20" />

      <div className="relative z-10 flex min-h-[430px] items-center px-4 py-12 sm:px-8 lg:px-12">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1 text-sm text-zinc-100 backdrop-blur">
            <ShoppingBag className="size-4" />
            Everyday shopping made simple
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              ShopMart
            </h1>
            <p className="max-w-xl text-base leading-7 text-zinc-200 sm:text-lg">
              Discover fresh picks, trusted brands, and quick deals across your favorite categories.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/pages/products">
                Shop products
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full border-white/30 bg-white/10 text-white hover:bg-white hover:text-zinc-950 sm:w-auto">
              <Link href="/pages/categories">Browse categories</Link>
            </Button>
          </div>

          <div className="grid max-w-xl gap-3 pt-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm text-zinc-200">
              <Truck className="size-4 text-emerald-300" />
              Fast delivery on daily orders
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-200">
              <ShieldCheck className="size-4 text-emerald-300" />
              Secure checkout experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

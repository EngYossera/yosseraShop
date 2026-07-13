import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

type BrandsResponse = {
  data: Brand[];
};

async function getBrands() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [] as Brand[];
    }

    const payload: BrandsResponse = await response.json();
    return payload.data;
  } catch {
    return [] as Brand[];
  }
}

export default async function Brands() {
  const brands = await getBrands();

  return (
    <main className="space-y-8 pb-6">
      <section className="rounded-md border bg-zinc-950 px-5 py-10 text-white sm:px-8">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1 text-sm text-zinc-100">
            <BadgeCheck className="size-4" />
            Original brands
          </div>
          <h1 className="text-3xl font-bold tracking-normal sm:text-4xl">Shop trusted brands</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
            Discover brands from the Route ecommerce catalog with a simple layout made for quick browsing.
          </p>
        </div>
      </section>

      {brands.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand) => (
            <Card key={brand._id} className="overflow-hidden p-0 transition hover:border-zinc-300 hover:shadow-sm">
              <Link href={`/pages/products?brand=${brand._id}`} className="group block">
                <div className="relative aspect-4/3 bg-white p-5">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-6 transition duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex items-center justify-between gap-3 border-t p-4">
                  <div>
                    <h2 className="line-clamp-1 font-semibold">{brand.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{brand.slug}</p>
                  </div>
                  <ArrowRight className="size-5 text-emerald-700 transition group-hover:translate-x-1" />
                </CardContent>
              </Link>
            </Card>
          ))}
        </section>
      ) : (
        <section className="rounded-md border bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold">Brands are not available now</h2>
          <p className="mt-2 text-sm text-muted-foreground">Please try again in a few moments.</p>
          <Button asChild className="mt-5">
            <Link href="/pages/products">Browse products</Link>
          </Button>
        </section>
      )}
    </main>
  );
}

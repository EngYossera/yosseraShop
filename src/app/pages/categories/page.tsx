import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Grid3X3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

type CategoriesResponse = {
  data: Category[];
};

async function getCategories() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [] as Category[];
    }

    const payload: CategoriesResponse = await response.json();
    return payload.data;
  } catch {
    return [] as Category[];
  }
}

export default async function Categories() {
  const categories = await getCategories();

  return (
    <main className="space-y-8 pb-6">

      {categories.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category._id} className="overflow-hidden p-0">
              <Link href={`/pages/products?category=${category._id}`} className="group block">
                <div className="relative aspect-[16/10] bg-zinc-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                </div>
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <h2 className="font-semibold">{category.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Explore {category.slug}</p>
                  </div>
                  <ArrowRight className="size-5 text-emerald-700 transition group-hover:translate-x-1" />
                </CardContent>
              </Link>
            </Card>
          ))}
        </section>
      ) : (
        <section className="rounded-md border bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold">Categories are not available now</h2>
          <p className="mt-2 text-sm text-muted-foreground">Please try again in a few moments.</p>
          <Button asChild className="mt-5">
            <Link href="/pages/products">Browse products</Link>
          </Button>
        </section>
      )}
    </main>
  );
}

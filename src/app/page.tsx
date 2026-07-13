import Link from "next/link";
import { Grid3X3, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <section className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-normal text-zinc-950 sm:text-5xl">Welcome to ShopMart</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/pages/products">
              <ShoppingBag className="size-4" />
              Shop Now
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/pages/categories">
              <Grid3X3 className="size-4" />
              Categories
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

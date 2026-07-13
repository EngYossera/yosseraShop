import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import RemoveFromWishlist from "@/components/RemoveFromWishlist/RemoveFromWishlist";
import AddToCart from "@/components/AddToCart/AddToCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { getWishlistAction } from "@/actions/wishlist.action";
import { Product } from "@/inrerfaces/productsInterfaces";

interface WishlistResponse {
  data: Product[];
}

export default async function WishList() {
  const wishlist = await getWishlistAction() as WishlistResponse | null;
  const products = wishlist?.data ?? [];

  if (!products.length) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <Heart className="size-12" />
        <h1 className="text-2xl font-semibold">Your wishlist is empty</h1>
        <p className="text-muted-foreground">Save products you like to find them here later.</p>
        <Button asChild><Link href="/pages/products">Browse products</Link></Button>
      </main>
    );
  }

  return (
    <main className="space-y-6 py-4">
      <div>
        <h1 className="text-3xl font-bold">Wishlist</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your saved products</p>
      </div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product._id} className="overflow-hidden pt-0">
            <Link href={`/pages/products/${product._id}`}>
              <Image src={product.imageCover} alt={product.title} width={400} height={300} className="h-48 w-full object-cover" />
              <CardHeader>
                <CardDescription>{product.brand.name}</CardDescription>
                <CardTitle className="line-clamp-1">{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{formatCurrency(product.price)}</p>
              </CardContent>
            </Link>
            <div className="space-y-2 px-6 pb-6">
              <AddToCart productId={product._id} showWishlist={false} wishlistStyle preserveWishlist />
              <RemoveFromWishlist productId={product._id} />
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}

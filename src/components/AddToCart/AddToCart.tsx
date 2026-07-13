"use client";
import { Heart, Loader2, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { CartResponse } from "@/inrerfaces/CartInterfaces";
import { useState } from "react";
import toast from "react-hot-toast";
import { addToCartAction, addWishlistProductToCartAction } from "@/actions/addToCart.action";
import { addToWishlistAction } from "@/actions/wishlist.action";
import { useRouter } from "next/navigation";

export default function AddToCart({
  productId,
  showWishlist = true,
  wishlistStyle = false,
  preserveWishlist = false,
}: {
  productId: string;
  showWishlist?: boolean;
  wishlistStyle?: boolean;
  preserveWishlist?: boolean;
}) {
  const router = useRouter();
  const [isLoading , setLoading]=useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  async function AddToCart(productId: string) {
try{
  setLoading(true);
const data: CartResponse = preserveWishlist
  ? await addWishlistProductToCartAction(productId)
  : await addToCartAction(productId);
if(data === null){
  toast.error("Please login first");
  router.push("/pages/login");
  return;
}
toast.success(data.message || "Product added to cart");
 dispatchEvent(new CustomEvent('cartUpdate', {detail:data.numOfCartItems}));
} catch (error) {
  console.error("Error adding to cart:", error);
  toast.error("Could not add product to cart");
} finally {
  setLoading(false);
}}

  async function addToWishlist() {
    try {
      setIsWishlistLoading(true);
      const data = await addToWishlistAction(productId);

      if (!data) {
        toast.error("Please login first");
        router.push("/pages/login");
        return;
      }

      if (data.status === "success") {
        setIsWishlisted(true);
        toast.success(data.message || "Product added to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Could not add product to wishlist");
    } finally {
      setIsWishlistLoading(false);
    }
  }

  const addButton = (
    <Button
      disabled={isLoading}
      onClick={() => AddToCart(productId)}
      className={wishlistStyle ? "w-full gap-2 bg-black text-white hover:bg-zinc-800" : "grow gap-2"}
    >
    Add to Cart
    {isLoading ? <Loader2 className="animate-spin" /> : <ShoppingCart />}
    </Button>
  );

  if (wishlistStyle) return addButton;

  return <CardFooter className="flex gap-2">
  {addButton}
  {showWishlist && <Button
    type="button"
    variant="outline"
    size="icon"
    disabled={isWishlistLoading}
    onClick={addToWishlist}
    aria-label="Add to wishlist"
  >
    {isWishlistLoading ? <Loader2 className="animate-spin" /> : <Heart className={isWishlisted ? "fill-black text-black" : ""} />}
  </Button>}
  </CardFooter>
}


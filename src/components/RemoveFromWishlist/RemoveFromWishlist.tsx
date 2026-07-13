"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { removeFromWishlistAction } from "@/actions/wishlist.action";
import { Button } from "@/components/ui/button";

export default function RemoveFromWishlist({ productId }: { productId: string }) {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  async function removeProduct() {
    try {
      setIsRemoving(true);
      const data = await removeFromWishlistAction(productId);

      if (data?.status === "success") {
        toast.success(data.message || "Product removed from wishlist");
        router.refresh();
      } else {
        toast.error("Could not remove product from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Could not remove product from wishlist");
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
      disabled={isRemoving}
      onClick={removeProduct}
    >
      {isRemoving ? <Loader2 className="animate-spin" /> : <Trash2 />}
      Remove from wishlist
    </Button>
  );
}

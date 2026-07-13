"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const wishlistUrl = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function addToWishlistAction(productId: string) {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const response = await fetch(wishlistUrl, {
    method: "POST",
    headers: {
      token: session.token as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  return response.json();
}

export async function getWishlistAction() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const response = await fetch(wishlistUrl, {
    headers: { token: session.token as string },
    cache: "no-store",
  });

  if (!response.ok) return null;

  return response.json();
}

export async function removeFromWishlistAction(productId: string) {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const response = await fetch(`${wishlistUrl}/${productId}`, {
    method: "DELETE",
    headers: { token: session.token as string },
  });

  const data = await response.json();

  if (response.ok) {
    revalidatePath("/pages/wishlist");
  }

  return data;
}

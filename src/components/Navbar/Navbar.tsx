import Link from "next/link";
import { Heart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogOut from "../LogOut/LogOut";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import CartIcon from "../CartIcon/CartIcon";
import { CartResponse } from "@/inrerfaces/CartInterfaces";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  let data: CartResponse | null = null;

  if (session) {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: session.token as string },
    });
    if (response.ok) data = await response.json();
  }

  const links = (
    <>
      <Link href="/pages/products" className="rounded-md px-3 py-2 text-sm transition hover:bg-gray-200">Products</Link>
      <Link href="/pages/brands" className="rounded-md px-3 py-2 text-sm transition hover:bg-gray-200">Brands</Link>
      <Link href="/pages/categories" className="rounded-md px-3 py-2 text-sm transition hover:bg-gray-200">Categories</Link>
      {session && <Link href="/pages/wishlist" className="rounded-md px-3 py-2 text-sm transition hover:bg-gray-200">Wishlist</Link>}
    </>
  );

  const accountMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="Open account menu" className="inline-flex size-11 items-center justify-center rounded-md transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500">
          <User className="size-5 sm:size-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {session ? (
            <>
              <Link href="/pages/profile"><DropdownMenuItem>Profile</DropdownMenuItem></Link>
              <Link href="/pages/allOrder"><DropdownMenuItem>My Orders</DropdownMenuItem></Link>
              <LogOut />
            </>
          ) : (
            <>
              <Link href="/pages/login"><DropdownMenuItem>Login</DropdownMenuItem></Link>
              <Link href="/pages/Register"><DropdownMenuItem>Register</DropdownMenuItem></Link>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="border-b bg-gray-50 shadow-sm">
      <div className="container mx-auto px-4 font-semibold">
        <div className="hidden min-h-16 items-center justify-between gap-3 md:flex">
          <h2 className="shrink-0 text-2xl"><Link href="/" className="block py-3">ShopMart</Link></h2>
          <div className="flex items-center gap-1">{links}</div>
          <div className="flex shrink-0 items-center gap-2">
            {accountMenu}
            {session && data && <div className="inline-flex size-11 items-center justify-center rounded-md transition hover:bg-gray-200"><CartIcon serverCartNumber={data.numOfCartItems} cartId={data.data.cartOwner} /></div>}
          </div>
        </div>

        <div className="py-4 md:hidden">
          <h2 className="text-3xl font-bold">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-11 items-center justify-center rounded-xl bg-black text-xl text-white">S</span>
              ShopMart
            </Link>
          </h2>
          <div className="mt-5 grid gap-2 text-lg">
            {links}
          </div>
          <div className="mt-4 flex items-center gap-2">
            {accountMenu}
            {session && data && <div className="inline-flex size-11 items-center justify-center rounded-md transition hover:bg-gray-200"><CartIcon serverCartNumber={data.numOfCartItems} cartId={data.data.cartOwner} /></div>}
            {session && <Link href="/pages/wishlist" aria-label="Wishlist" className="inline-flex size-11 items-center justify-center rounded-md transition hover:bg-gray-200"><Heart className="size-5" /></Link>}
          </div>
        </div>
      </div>
    </nav>
  );
}

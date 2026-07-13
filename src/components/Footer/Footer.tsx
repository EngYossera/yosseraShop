import Link from "next/link";
import { Globe, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck, Truck } from "lucide-react";

const shopLinks = [
  { href: "/pages/products", label: "Products" },
  { href: "/pages/categories", label: "Categories" },
  { href: "/pages/brands", label: "Brands" },
  { href: "/pages/profile", label: "Profile" },
];

const serviceLinks = ["Fast delivery", "Secure payment", "Easy returns", "Customer support"];

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-normal">
              ShopMart
            </Link>
            <p className="max-w-xs text-sm leading-6 text-zinc-400">
              Fresh products, trusted brands, and simple shopping for your everyday needs.
            </p>
            <div className="flex gap-3">
              <Link href="#" aria-label="Facebook" className="rounded-md border border-zinc-800 p-2 text-zinc-300 transition hover:border-zinc-600 hover:text-white">
                <Globe className="size-4" />
              </Link>
              <Link href="#" aria-label="Instagram" className="rounded-md border border-zinc-800 p-2 text-zinc-300 transition hover:border-zinc-600 hover:text-white">
                <MessageCircle className="size-4" />
              </Link>
              <Link href="#" aria-label="Twitter" className="rounded-md border border-zinc-800 p-2 text-zinc-300 transition hover:border-zinc-600 hover:text-white">
                <Send className="size-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Shop</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Service</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {serviceLinks.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  {item === "Fast delivery" ? <Truck className="size-4 text-emerald-400" /> : <ShieldCheck className="size-4 text-emerald-400" />}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-emerald-400" />
                <span>+20 100 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-emerald-400" />
                <span>support@shopmart.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-emerald-400" />
                <span>Cairo, Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-zinc-800 pt-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ShopMart. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="transition hover:text-zinc-200">Privacy</Link>
            <Link href="#" className="transition hover:text-zinc-200">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

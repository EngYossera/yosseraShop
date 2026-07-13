"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  async function registerUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");
    const phone = String(form.get("phone") || "").trim();

    setSubmitError("");

    if (!name || !email || !password || !confirmPassword || !phone) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    if (!/^01[0125]\d{8}$/.test(phone)) {
      setSubmitError("Enter a valid Egyptian mobile number, for example: 01009000900.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match. Please enter the same password.");
      return;
    }

    setPasswordError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          rePassword: password,
          phone,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        const validationMessage = Array.isArray(data.errors)
          ? data.errors.map((error: { msg?: string; message?: string }) => error.msg || error.message).filter(Boolean).join(" ")
          : "";
        setSubmitError(validationMessage || data.message || "Could not create your account.");
        return;
      }

      toast.success("Account created successfully. Please sign in.");
      router.push("/pages/login?callbackUrl=/");
    } catch {
      setSubmitError("Could not connect to the registration service. Check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:py-12">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">Register now and Join us</h1>
      <Card className="border-zinc-200 py-3 shadow-md sm:py-5">
        <CardContent className="pt-3 sm:pt-5">
          <form className="space-y-6" onSubmit={registerUser} noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Ahmed" className="h-12 px-4 text-base" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="ahmed@example.com" className="h-12 px-4 text-base" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="h-12 px-4 pr-12 text-base" required />
                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" className="h-12 px-4 pr-12 text-base" aria-invalid={Boolean(passwordError)} onChange={() => passwordError && setPasswordError("")} required />
                <button type="button" aria-label={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"} onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground hover:text-foreground">
                  {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              {passwordError && <p role="alert" className="text-sm font-medium text-red-600">{passwordError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Egypt)</Label>
              <div className="flex h-12 overflow-hidden rounded-lg border border-input bg-transparent focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                <span className="flex items-center border-r border-input bg-zinc-50 px-4 text-sm font-medium text-zinc-700">+20</span>
                <Input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" pattern="01[0125][0-9]{8}" maxLength={11} placeholder="01009000900" className="h-full border-0 px-4 text-base focus-visible:border-0 focus-visible:ring-0" required />
              </div>
              <p className="text-xs text-muted-foreground">Example: 01009000900</p>
            </div>
            {submitError && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">{submitError}</p>}
            <Button type="submit" disabled={isSubmitting} className="h-12 w-full bg-zinc-950 text-base hover:bg-zinc-800">
              {isSubmitting ? "Creating account..." : "Submit"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          Already have an account?
          <Link href="/pages/login" className="ml-1 font-medium text-emerald-700 hover:text-emerald-800">Login</Link>
        </CardFooter>
      </Card>
    </main>
  );
}

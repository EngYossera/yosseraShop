"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().nonempty("email is required").email("invalid email"),
  password: z.string().nonempty("password is required"),
});

type FormData = z.infer<typeof formSchema>;

type LoginFormProps = {
  callbackUrl?: string;
};

export default function LoginForm({ callbackUrl = "/" }: LoginFormProps) {
  const router = useRouter();
  const safeCallbackUrl = callbackUrl.startsWith("/") ? callbackUrl : "/";
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: safeCallbackUrl,
    });

    if (response?.ok) {
      toast.success("Logged in successfully");
      router.push(response.url || safeCallbackUrl);
      router.refresh();
      return;
    }

    toast.error(response?.error || "Email or password is incorrect");
  }

  return (
    <Card className="w-full border-zinc-200 py-3 shadow-md sm:max-w-md sm:py-5">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <p className="text-sm text-muted-foreground">Sign in to continue shopping.</p>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                  <Input {...field} type="email" id="form-rhf-demo-email" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">Password</FieldLabel>
                  <div className="relative">
                    <Input {...field} type={showPassword ? "text" : "password"} id="form-rhf-demo-password" aria-invalid={fieldState.invalid} className="pr-10" />
                    <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Field orientation="horizontal" className="w-full justify-end">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Signing in..." : "Submit"}
          </Button>
        </Field>
        <p className="text-sm text-muted-foreground">
          New to ShopMart? <Link href="/pages/Register" className="font-medium text-emerald-700 hover:text-emerald-800">Create an account</Link>
        </p>
      </CardFooter>
    </Card>
  );
}

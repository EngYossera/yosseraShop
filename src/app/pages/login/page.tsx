import LoginForm from "@/components/LoginForm/LoginForm";

type LoginPageProps = {
  searchParams?: {
    callbackUrl?: string;
  };
};

export default function Login({ searchParams }: LoginPageProps) {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-10">
      <LoginForm callbackUrl={searchParams?.callbackUrl || "/"} />
    </main>
  );
}

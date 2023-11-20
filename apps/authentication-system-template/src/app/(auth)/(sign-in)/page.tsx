import LoginForm from "@/components/auth/login-form";
import { displayToastAfterFetch } from "@/lib/displayToast";
import Link from "next/link";

export default async function SigninPage() {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center h-full w-full">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <h2>Sign in to your account</h2>
      <LoginForm />
      <span className="whitespace-nowrap">
        Don't have an account? <Link href="/sign-up">Sign Up!</Link>
      </span>
    </div>
  );
}

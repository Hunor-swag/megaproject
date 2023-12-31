"use client";

import Link from "next/link";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { displayToastAfterFetch } from "@/lib/displayToast";
import { useState } from "react";

export default function ResetPasswordForm({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  //   console.log(errors);

  async function onSubmit(formdata: any) {
    if (isSubmitting) {
      return;
    }

    const subdomain = window.location.hostname.split('.')[0];


    setIsSubmitting(true);

    const res = await fetch(
      `https://${subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/forgot-password/change`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formdata.password,
          repeat_password: formdata.repeat_password,
          token,
        }),
      }
    );

    const data = await res.json();

    displayToastAfterFetch(res, data, () => router.push("/"));
    setIsSubmitting(false);
  }

  return (
    <form
      className="flex flex-col space-y-4 w-full text-sm"
      onSubmit={handleSubmit(async (data) => {
        onSubmit(data);
      })}
    >
      <TextInput
        register={register}
        name="password"
        label="Password"
        placeholder="Enter your password..."
        type="password"
        required={true}
        minLength={8}
        error={errors?.password?.message?.toString()}
      />
      <TextInput
        register={register}
        name="repeat_password"
        label="Repeat Password"
        placeholder="Enter your password again..."
        type="password"
        required={true}
        minLength={8}
        error={errors?.repeat_password?.message?.toString()}
      />
      <Button disabled={isSubmitting}>
        {isSubmitting ? "Changing password..." : "Change password"}
      </Button>
    </form>
  );
}

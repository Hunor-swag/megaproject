"use client";

import Link from "next/link";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { displayToastAfterFetch } from "@/lib/displayToast";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(formdata: any) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const subdomain = window.location.hostname.split('.')[0];

    const res = await fetch(
      `https://${subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formdata.email,
        }),
      }
    );

    const data = await res.json();

    displayToastAfterFetch(res, data);

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
        name="email"
        label="Email"
        placeholder="Enter your email..."
        type="email"
        required={true}
        minLength={8}
        error={errors?.email?.message?.toString()}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending email..." : "Send Email"}
      </Button>
    </form>
  );
}

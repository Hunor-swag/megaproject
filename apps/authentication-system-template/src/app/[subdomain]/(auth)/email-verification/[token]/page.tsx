"use client";

import { displayToastAfterFetch } from "@/lib/displayToast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerificationPage({
  params,
}: {
  params: { token: string };
}) {
  const router = useRouter();
  const [accountCreated, setAccountCreated] = useState(false);
  const { token } = params;

  const signUp = (subdomain: string) => {
    const res = fetch(
      `https://${subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/sign-up/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        displayToastAfterFetch(res, data, () => {
          setTimeout(() => {
            router.push("/");
          }, 2000);
        });
      });
    });
  };

  useEffect(() => {
    const subdomain = window.location.hostname.split(".")[0];
    if (token && !accountCreated) {
      signUp(subdomain);
      setAccountCreated(true);
    }
  }, []);

  return <div>You're request is being processed...</div>;
}

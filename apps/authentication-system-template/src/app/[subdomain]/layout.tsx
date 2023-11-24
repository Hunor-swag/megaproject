import type { Metadata, ResolvingMetadata } from "next";
import { SystemType } from "types";

type Props = {
  params: { subdomain: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const subdomain = params.subdomain;
  // fetch data
  const res = await fetch(
    `https://${subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/api/systems/${subdomain}`
  );
  const system = (await res.json()) as SystemType;
  return {
    title: system.name,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

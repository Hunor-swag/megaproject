import React from "react";

export default function DomainPage({ params }: { params: { domain: string } }) {
  const { domain } = params;

  return <div>Welcome to {domain}</div>;
}

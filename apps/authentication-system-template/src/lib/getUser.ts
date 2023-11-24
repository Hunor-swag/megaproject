export async function getUserById(id: number, subdomain: string) {
  const res = await fetch(
    `https://${subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/user/${id}`
  );
  const user = await res.json();
  if (!user) {
    console.log("No user found with id", id);
  }
  // console.log(user);
  return user;
}

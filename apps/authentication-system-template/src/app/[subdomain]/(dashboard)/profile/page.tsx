import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditProfileForm from "@/components/dashboard/edit-profile/EditProfileForm";
import { getUserById } from "@/lib/getUser";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const subdomain = headers().get("host")?.split(".")[0];

  const user = await getUserById(session.user.id, subdomain!);

  return (
    <div>
      <EditProfileForm user={user} />
    </div>
  );
}

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ReduxProvider } from "@/redux/provider";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<html lang={session?.user?.lang || "en"}>
			<body>
				<NextAuthProvider session={session}>
					<ReduxProvider>{children}</ReduxProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}

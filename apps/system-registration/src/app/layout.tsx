import { ToastContainer } from "react-toastify";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				{children}
				<ToastContainer />
			</body>
		</html>
	);
}

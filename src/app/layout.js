import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PackageProvider } from "../context/PackageContext";
import Navbar from "../components/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Example Shop",
  description: "An example shop using Next.js and Tebex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthProvider>
          <PackageProvider>
            <Navbar />
            {children}
          </PackageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

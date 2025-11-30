import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PackageProvider } from "../context/PackageContext";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
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
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <PackageProvider>
              <Navbar />
              {children}
            </PackageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: [ "latin" ] });

export const metadata = {
  title: "%s | Next JS Explore [API & JWT]",
  description: "Exploring Next JS power on API with Node JS, Express JS, MongoDB and JWT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter?.className}>{children}</body>
    </html>
  );
}

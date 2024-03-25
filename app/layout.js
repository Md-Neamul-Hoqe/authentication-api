import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import AuthProvider from "./Providers/AuthProvider";


export const metadata = {
  title: {
    template: "%s - Next JS Explore [API & JWT]",
    default: 'Next JS Explore [API & JWT]'
  },
  description: "Exploring Next JS power on API with Node JS, Express JS, MongoDB and JWT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import Header from "@/src/components/Header";
import { AuthProvider } from "../components/Hooks/useAuth"; // Adjust the path if needed
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-light"
      >
        <ToastContainer position="top-right" autoClose={3000} />
        <AuthProvider>
        <Header />
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}

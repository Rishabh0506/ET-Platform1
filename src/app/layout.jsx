import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "ET AI Experience",
  description: "Production-ready frontend for ET platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

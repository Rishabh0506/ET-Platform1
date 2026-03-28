import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "ET AI Experience",
  description: "Production-ready frontend for ET platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

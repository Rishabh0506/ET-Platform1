import "./globals.css";

export const metadata = {
  title: "ET AI Experience",
  description: "Production-ready frontend for ET platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

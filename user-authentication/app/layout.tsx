import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Authentication App",
  description: "Sign in and sign up application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

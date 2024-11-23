import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KYC",
  description: "KYC form for onboarding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/apple.png" />
      <body>{children}</body>
    </html>
  );
}

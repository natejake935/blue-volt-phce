import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blue Volt Electrical | Same-Day Electrician in San Diego",
  description:
    "Get a licensed electrician at your door today. Same-day service across San Diego County. Book a 2-hour arrival window in under 60 seconds.",
  keywords:
    "electrician San Diego, same-day electrician, emergency electrician, panel upgrade, EV charger installation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

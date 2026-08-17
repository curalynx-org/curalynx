import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curalynx | Care that moves with you",
  description: "Thoughtful health guidance for everyday wellbeing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

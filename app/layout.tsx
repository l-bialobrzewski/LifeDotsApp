import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeDots — Zobacz swoje życie jako doty",
  description:
    "LifeDots wizualizuje Twoje życie jako siatkę tygodni. Oznaczaj nastrój, zapisuj chwile, żyj bardziej świadomie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

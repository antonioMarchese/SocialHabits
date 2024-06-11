import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";

const APP_NAME = "Habits";
const APP_DEFAULT_TITLE = "Habits";
const APP_TITLE_TEMPLATE = "%s - Habits";
const APP_DESCRIPTION = "Track your habits";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  minimumScale: 1,
  maximumScale: 1,
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${inter.className} bg-zinc-950`}>
        <TRPCReactProvider>
          <main>{children}</main>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/providers";

import "reflect-metadata";

export const metadata: Metadata = {
  title: {
    template: "%s | Destination Australia",
    default: "Destination Australia | Startek",
  },
  description:
    "Welcome to Destination Australia - the ultimate app designed to assist foreign students arriving in Australia. Whether you are planning to study, explore, or settle down in Australia, this app provides essential tools and a vibrant social community to make your journey smoother.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Destination Australia | Startek",
    description:
      "Discover popular destinations, landmarks, and attractions across Australia. Find useful tips on travel, local culture, accommodation, and more.",
    type: "website",
    images: [
      {
        url: "/meta/ogg.png",
        width: 1640,
        height: 924,
        alt: "Destination Australia Web",
      },
    ],
  },
  icons: {
    icon: "/meta/favicon.ico",
  },
};

// const manrope = Manrope({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700"],
// });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Sans_3, Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import StyledJsxRegistry from "@/components/StyledJsxRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sangalotech.com.np"),
  title: "Top IT Institutes & Job‑Ready Programs in Nepal | Sangalo Tech",
  description: "Sangalo Tech offers premier IT training in Nepal, specializing in UI UX Design, Full‑stack development, MERN Stack, and more. Join our job-ready programs today.",
  keywords: ["IT Institute Nepal", "Web Development Training Nepal", "UI UX Design Course Nepal", "MERN Stack Course Nepal", "Sangalo Tech", "Job Ready Programs"],
  authors: [{ name: "Sangalo Tech" }],
  openGraph: {
    title: "Top IT Institutes & Job‑Ready Programs in Nepal | Sangalo Tech",
    description: "Sangalo Tech offers premier IT training in Nepal, specializing in UI UX Design, Full‑stack development, MERN Stack, and more.",
    url: "https://sangalotech.com.np",
    siteName: "Sangalo Tech",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sangalo Tech - Top IT Institute in Nepal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top IT Institutes & Job‑Ready Programs in Nepal | Sangalo Tech",
    description: "Sangalo Tech offers premier IT training in Nepal, specializing in UI UX Design, Full‑stack development, MERN Stack, and more.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-heading',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={`${sourceSans.variable} ${ubuntu.variable} ${geistSans.variable} ${geistMono.variable}`} >
        <StyledJsxRegistry>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}

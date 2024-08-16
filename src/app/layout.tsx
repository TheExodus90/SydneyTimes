import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=UnifrakturCook:wght@700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Cormorant+Garamond:wght@400;700&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-white text-black flex flex-col min-h-screen font-article">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 pt-[95px]">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

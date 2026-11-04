import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const titulos = Playfair_Display({
  subsets: ["latin"],
  variable: "--fuente-titulos",
});

const texto = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--fuente-texto",
});

export const metadata = {
  title: "Vivero Varden",
  description: "Plantas, árboles, macetas y todo para tu jardín",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${titulos.variable} ${texto.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
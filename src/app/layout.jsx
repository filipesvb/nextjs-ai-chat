import "./reset.css";
import "./globals.css";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Roboto, Outfit } from "next/font/google";
import Image from "next/image";
import background from "./hoffman.png";

export const metadata = {
  title: "ROB",
  description: "Tech Help",
};

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export const outfit = Outfit({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} overflow-hidden`}>
        <div className="w-[200%] h-full absolute top-0 left-0 -z-1 animate-wiggle">
          <div className="bg-[url(./hoffman.png)] w-full h-full"></div>
          <div className="bg-[url(./hoffman.png)] w-full h-full"></div>
        </div>
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: process.env.SITE_TITLE ?? "env.SITE_TITLE",
  description: "Nothing to see here...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col items-center bg-default text-default min-h-screen`}
      >
        <Header />
        <div id="main" className={`w-full max-w-[800px] p-4 sm:p-8`}>
          {children}
        </div>
      </body>
    </html>
  );
}

function Header() {
  return (
    <div className="w-full bg-muted p-4 sm:p-8">
      <div className="text-1xl sm:text-3xl ">
        <Link href="/">{process.env.SITE_TITLE ?? "env.SITE_TITLE"}</Link>
      </div>
    </div>
  );
}

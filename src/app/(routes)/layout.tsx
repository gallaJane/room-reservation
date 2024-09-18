import type { Metadata } from "next";
import { Ubuntu, Montserrat } from "next/font/google";
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import Provider from "@/app/lib/provider";

export const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700']
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Flowr Spot",
  description: "Flowr Spot App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={ubuntu.className} >

          <div className="pb-20">
            <Provider>
              {children}
            </Provider>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}

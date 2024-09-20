import type { Metadata } from "next";
import { Ubuntu, Montserrat } from "next/font/google";
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import SignInModal from "@/components/modals/sign-in-modal";
import SignUpModal from "@/components/modals/sign-up-modal";
import Provider from "@/app/lib/provider";
import Navbar from "@/components/layouts/navbar";
import Container from "@/components/ui/container";


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
  title: "CoWork Rooms",
  description: "CoWork Rooms App",
  icons: { icon: '/booking-icon.svg' }
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
        <body className={ubuntu.className}>
          <main className="flex flex-col min-h-screen bg-secondary">
            <SignInModal />
            <SignUpModal />
            <Navbar currentUser={session?.user} />
            <section className="pb-20 flex-grow">
              <Provider>
                <Container>
                  {children}
                </Container>

              </Provider>
            </section>
          </main>

        </body>
      </html>
    </SessionProvider>
  );
}

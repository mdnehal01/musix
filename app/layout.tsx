import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModelProvider from "@/providers/ModelProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/player";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Musix",
  description: "Listen to Music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider/>
              <Sidebar songs={userSongs}>
                {children}
              </Sidebar>
              {/* <Player/> */}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
 
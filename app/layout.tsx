import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModelProvider from "@/providers/ModelProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";


import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getPlaylistByUserId from "@/actions/getPlaylistByUserId";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onemusix",
  description: "Listen to Music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();
  const fetchedPlaylist = await getPlaylistByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider products={products}/>
              <Sidebar songs={userSongs} playlist={fetchedPlaylist}>
                {children}
              </Sidebar>
              {/* <Player/> */}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
 
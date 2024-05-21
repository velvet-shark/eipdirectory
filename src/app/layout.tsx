import PlausibleProvider from "next-plausible";
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "EIP Directory",
  description: "List of important EIPs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlausibleProvider domain="eip.directory">
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>{children}</body>
      </html>
    </PlausibleProvider>
  );
}

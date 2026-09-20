import { Archivo, Instrument_Sans } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fullName = `${profile.firstName} ${profile.lastName}`;
const blurb = `${profile.role} at ${profile.company}. React, Next.js, TypeScript, Node.js and cloud-native builds.`;

export const metadata = {
  title: `${fullName} — ${profile.role}`,
  description: blurb,
  openGraph: {
    title: fullName,
    description: blurb,
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f3f1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/*
          Applies the saved theme before first paint so the page never
          flashes the wrong palette. Defaults to light unless the visitor
          has explicitly chosen a theme.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

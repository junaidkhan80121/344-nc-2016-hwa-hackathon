import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/components/CartProvider";
import { ToastProvider } from "@/components/ToastProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://344-nc-2016-hwa-hackathon.vercel.app"),
  title: {
    default: "ScentTrail Pods — A quiet scent for every room",
    template: "%s · ScentTrail Pods",
  },
  description:
    "Analog scent diffusers and compostable refill pods. Find your trail with ScentTrail Pods — slow fragrance for rooms that deserve a ritual.",
  keywords: ["scent diffuser", "refill pods", "home fragrance", "compostable", "ScentTrail"],
  openGraph: {
    title: "ScentTrail Pods — A quiet scent for every room",
    description: "Analog diffusers. Compostable pods. Nine trails for the rooms you live in.",
    type: "website",
    images: ["/with.png"],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe5" },
    { media: "(prefers-color-scheme: dark)", color: "#111310" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('scenttrail:theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ToastProvider>
          <ThemeProvider>
            <AuthProvider>
              <CartProvider>
                <a className="skip-link" href="#main">
                  Skip to content
                </a>
                <div className="announce-bar">
                  <span>Free US shipping over $75</span>
                  <span className="announce-dot" aria-hidden="true" />
                  <span>30-day trail guarantee</span>
                  <span className="announce-dot" aria-hidden="true" />
                  <span>Compostable refills, always</span>
                </div>
                <Header />
                <main id="main">{children}</main>
                <Footer />
                <CartDrawer />
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

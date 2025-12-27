import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DisclaimerModal from "@/components/DisclaimerModal";
import { ValuationProvider } from "@/context/ValuationContext";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "NSE Stock Valuation Calculator",
      },
      {
        name: "description",
        content:
          "Calculate key stock valuation metrics for Nairobi Securities Exchange stocks. Get buy/hold/sell recommendations based on fundamental analysis.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen flex flex-col">
        <ValuationProvider>
          <Header />
          <main className="flex-1 bg-slate-50">{children}</main>
          <Footer />
          <DisclaimerModal />
          <Analytics />
        </ValuationProvider>
        <Scripts />
      </body>
    </html>
  );
}

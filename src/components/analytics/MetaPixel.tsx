"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { trackPageView } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

// Só dígitos: o ID entra num script inline.
const RAW_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const PIXEL_ID = /^\d+$/.test(RAW_ID) ? RAW_ID : "";

export function MetaPixel() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  // Guarda utm_* / fbclid assim que a pessoa chega, em qualquer página.
  useEffect(() => {
    captureAttribution();
  }, []);

  // O PageView da primeira carga sai no próprio script; aqui só as navegações seguintes.
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    trackPageView();
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

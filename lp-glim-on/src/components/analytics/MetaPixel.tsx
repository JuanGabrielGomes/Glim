"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { relayInitialPageView, trackEngagement, trackPageView } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

// Só dígitos: o ID entra num script inline.
const RAW_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const PIXEL_ID = /^\d+$/.test(RAW_ID) ? RAW_ID : "";

const SCROLL_MARKS = [25, 50, 75, 90];
const TIME_MARKS = [15, 30, 60, 120, 300];

/** Rolagem (Rolagem_25…90) e tempo com a aba visível (Tempo_15s…300s), uma vez cada por página. */
function useEngagementTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID) return;
    const sent = new Set<string>();
    const fire = (name: string) => {
      if (sent.has(name)) return;
      sent.add(name);
      trackEngagement(name);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const percent = (window.scrollY / max) * 100;
      SCROLL_MARKS.forEach((mark) => {
        if (percent >= mark) fire(`Rolagem_${mark}`);
      });
    };

    // Conta só o tempo com a aba à vista.
    let visibleSeconds = 0;
    const tick = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      visibleSeconds += 1;
      TIME_MARKS.forEach((mark) => {
        if (visibleSeconds >= mark) fire(`Tempo_${mark}s`);
      });
    }, 1000);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(tick);
    };
  }, [pathname]);
}

export function MetaPixel() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  // Guarda utm_* / fbclid assim que a pessoa chega, em qualquer página.
  useEffect(() => {
    captureAttribution();
  }, []);

  // Cópia do servidor do PageView da primeira carga, com o mesmo event_id do script.
  useEffect(() => {
    if (!PIXEL_ID) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      const id = (window as Window & { __glimPv?: string }).__glimPv;
      if (id) {
        window.clearInterval(timer);
        relayInitialPageView(id);
      } else if (++tries > 20) {
        window.clearInterval(timer);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, []);

  useEngagementTracking();

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
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');window.__glimPv=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():String(Date.now())+Math.random();fbq('track','PageView',{},{eventID:window.__glimPv});`}
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

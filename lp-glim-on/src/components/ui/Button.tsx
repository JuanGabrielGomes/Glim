import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
/** Superfície onde o botão está: dark = fundo grafite (botão linho), light = fundo linho (botão grafite). */
type ButtonSurface = "dark" | "light";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  surface?: ButtonSurface;
  href?: string;
  /** Links externos abrem na mesma aba, a menos que newTab seja true. */
  newTab?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

const base =
  "faceta [--f:10px] inline-flex items-center justify-center gap-3 whitespace-nowrap px-6 py-4 font-sans text-base font-medium leading-none transition-opacity duration-200 hover:opacity-90 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, Record<ButtonSurface, string>> = {
  primary: {
    dark: "bg-linho-050 text-grafite-950",
    light: "bg-grafite-950 text-linho-050",
  },
  secondary: {
    dark: "border border-pedra-300 text-linho-050",
    light: "border border-pedra-500 text-grafite-950",
  },
};

export function Button({
  children,
  variant = "primary",
  surface = "dark",
  href,
  newTab = false,
  className,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(base, variants[variant][surface], className);

  if (href) {
    if (/^https?:\/\//.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

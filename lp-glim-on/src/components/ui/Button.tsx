import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  /** Links externos abrem na mesma aba, a menos que newTab seja true. */
  newTab?: boolean;
  /** Glow gold sutil — usar em um elemento por vez. */
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans text-base font-semibold transition-colors duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glim-gold focus-visible:ring-offset-2 focus-visible:ring-offset-glim-dark " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-glim-gold text-glim-dark hover:bg-glim-gold-hover",
  secondary: "border border-glim-gold/60 text-glim-light hover:border-glim-gold hover:bg-glim-gold/10",
};

export function Button({
  children,
  variant = "primary",
  href,
  newTab = false,
  glow = false,
  className,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(base, variants[variant], glow && "shadow-glow", className);

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

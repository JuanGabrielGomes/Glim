import { SHOW_TODOS } from "@/lib/dev";

interface TodoNoticeProps {
  children: React.ReactNode;
}

export function TodoNotice({ children }: TodoNoticeProps) {
  if (!SHOW_TODOS) return null;
  return (
    <p className="rounded-xl border border-dashed border-glim-gold bg-glim-gold/10 px-4 py-3 font-mono text-xs leading-relaxed">
      TODO: {children}
    </p>
  );
}

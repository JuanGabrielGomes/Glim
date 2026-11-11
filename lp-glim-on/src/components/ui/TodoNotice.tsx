import { SHOW_TODOS } from "@/lib/dev";

interface TodoNoticeProps {
  children: React.ReactNode;
}

export function TodoNotice({ children }: TodoNoticeProps) {
  if (!SHOW_TODOS) return null;
  return (
    <p className="border border-dashed border-ambar-400 bg-ambar-400/10 px-4 py-3 font-mono text-xs leading-relaxed">
      TODO: {children}
    </p>
  );
}

import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export function InputField({
  id,
  name,
  label,
  error,
  ...props
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#4f4a46] dark:text-[#efebe8]">
        {label}
      </span>
      <input
        id={id}
        name={name}
        className={`focus:border-glim-diamond focus:ring-glim-diamond/30 w-full rounded-[1.15rem] border bg-white/70 px-4 py-3 text-sm text-[#2f2b28] transition outline-none focus:ring-2 dark:bg-white/[0.06] dark:text-[#fbfaf8] ${error ? 'border-[#d6945a] dark:border-[#d6945a]' : 'border-black/10 dark:border-white/10'}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${id}-error`} className="mt-2 block text-sm text-[#995b27] dark:text-[#f0c49a]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function TextareaField({
  id,
  name,
  label,
  error,
  ...props
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'name'>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#4f4a46] dark:text-[#efebe8]">
        {label}
      </span>
      <textarea
        id={id}
        name={name}
        className={`focus:border-glim-diamond focus:ring-glim-diamond/30 min-h-[9.5rem] w-full rounded-[1.15rem] border bg-white/70 px-4 py-3 text-sm text-[#2f2b28] transition outline-none focus:ring-2 dark:bg-white/[0.06] dark:text-[#fbfaf8] ${error ? 'border-[#d6945a] dark:border-[#d6945a]' : 'border-black/10 dark:border-white/10'}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${id}-error`} className="mt-2 block text-sm text-[#995b27] dark:text-[#f0c49a]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

const CONTROL =
  'text-grafite-950 border-pedra-300 focus:border-grafite-950 w-full rounded-none border-0 border-b bg-transparent py-3 text-[17px] leading-[1.4] outline-none transition-colors placeholder:text-pedra-500/80 aria-[invalid=true]:border-ambar-700';

function FieldShell({ id, label, error, children }: FieldShellProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="meta text-pedra-500">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-ambar-700 text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface InputFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'name' | 'className'
> {
  id: string;
  name: string;
  label: string;
  error?: string;
}

/** Campo de texto com só a linha de baixo, label real e erro inline. */
export function InputField({ id, name, label, error, ...rest }: InputFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        name={name}
        className={CONTROL}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
    </FieldShell>
  );
}

interface SelectFieldProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'id' | 'name' | 'className' | 'children'
> {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  error?: string;
}

/** Select no mesmo estilo dos campos de texto. */
export function SelectField({ id, name, label, options, error, ...rest }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <select
        id={id}
        name={name}
        className={CONTROL}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

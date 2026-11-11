import { Fragment } from 'react';

interface NoBreakProps {
  children: string;
}

const HYPHENATED = /(\S*\p{L}-\p{L}\S*)/gu;

/**
 * Regra de marca (sem palavra quebrada): navegadores aceitam quebrar linha num hífen,
 * então "e-commerce" poderia virar "e-" / "commerce". Este componente segura essas palavras inteiras.
 */
export function NoBreak({ children }: NoBreakProps) {
  const parts = children.split(HYPHENATED);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  );
}

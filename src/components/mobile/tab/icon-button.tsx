import React from 'react'

export function IconButton({
  onClick,
  ariaLabel,
  children,
  disabled = false,
}: {
  onClick?: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={[
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
        'text-zinc-600 transition-colors',
        disabled
          ? 'cursor-not-allowed opacity-30'
          : 'hover:bg-zinc-100 active:bg-zinc-200',
      ].join(' ')}
    >
      {children}
    </button>
  );
}
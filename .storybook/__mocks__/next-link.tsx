import React from 'react';

export default function Link({
  href,
  children,
  className,
  style,
  target,
  rel,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  [key: string]: unknown;
}) {
  return (
    <a href={href} className={className} style={style} target={target} rel={rel} {...rest}>
      {children}
    </a>
  );
}

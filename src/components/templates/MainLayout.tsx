import { Fragment } from 'react';

interface MainLayoutProps {
  hero: React.ReactNode;
  sections: React.ReactNode[];
}

const Divider = () => (
  <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(var(--overlay-rgb), 0.06), transparent)', maxWidth: '900px', margin: '0 auto' }} />
);

export function MainLayout({ hero, sections }: MainLayoutProps) {
  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      {hero}
      {sections.map((section, i) => (
        <Fragment key={i}>
          <Divider />
          {section}
        </Fragment>
      ))}
    </div>
  );
}

'use client';

import { Fragment } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { SectionTitle } from '@/components/molecules';

interface TitleProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
}

interface CardListProps<T extends { id: string }> {
  sectionId?: string;
  title: TitleProps;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  maxWidth?: string;
  gap?: string;
}

export function CardList<T extends { id: string }>({
  sectionId,
  title,
  items,
  renderItem,
  maxWidth = '64rem',
  gap = '2rem',
}: CardListProps<T>) {
  const ref = useReveal();

  return (
    <section id={sectionId} ref={ref} className="section--fixed">
      <div style={{ maxWidth, margin: '0 auto' }}>
        <SectionTitle {...title} />
        <div style={{ display: 'flex', flexDirection: 'column', gap }}>
          {items.map((item, i) => (
            <Fragment key={item.id}>
              {renderItem(item, i)}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

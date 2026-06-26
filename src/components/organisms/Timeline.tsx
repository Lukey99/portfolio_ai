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

interface TimelineProps<T extends { id: string }> {
  sectionId?: string;
  title: TitleProps;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  maxWidth?: string;
}

export function Timeline<T extends { id: string }>({
  sectionId,
  title,
  items,
  renderItem,
  maxWidth = '56rem',
}: TimelineProps<T>) {
  const ref = useReveal();

  return (
    <section id={sectionId} ref={ref} className="section--fixed">
      <div style={{ maxWidth, margin: '0 auto' }}>
        <SectionTitle {...title} />
        <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
          <div className="timeline__track">
            <div className="timeline__fill" />
          </div>
          <div className="timeline-list">
            {items.map((item, i) => (
              <Fragment key={item.id}>{renderItem(item, i)}</Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

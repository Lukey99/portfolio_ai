'use client';

import { useReveal } from '@/hooks/useReveal';
import { SectionTitle } from '@/components/molecules';

interface TitleProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
}

export interface BentoItem<T> {
  data: T;
  colSpan?: number;
  rowSpan?: number;
}

interface BentoGridProps<T extends { id: string }> {
  sectionId?: string;
  title: TitleProps;
  items: BentoItem<T>[];
  renderItem: (item: T, index: number) => React.ReactNode;
  maxWidth?: string;
}

export function BentoGrid<T extends { id: string }>({
  sectionId,
  title,
  items,
  renderItem,
  maxWidth = '64rem',
}: BentoGridProps<T>) {
  const ref = useReveal();

  return (
    <section id={sectionId} ref={ref} style={{ padding: '7rem 1.5rem', backgroundColor: 'var(--bg)' }}>
      <div style={{ maxWidth, margin: '0 auto' }}>
        <SectionTitle {...title} />
        <div className="bento-grid">
          {items.map(({ data, colSpan, rowSpan }, i) => (
            <div
              key={data.id}
              style={{
                ...(colSpan ? { gridColumn: `span ${colSpan}` } : {}),
                ...(rowSpan ? { gridRow: `span ${rowSpan}` } : {}),
              }}
            >
              {renderItem(data, i)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

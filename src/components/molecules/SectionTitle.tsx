interface SectionTitleProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionTitle({ number, label, title, subtitle }: SectionTitleProps) {
  return (
    <div className="section-title-wrapper">
      <span className="section-watermark" aria-hidden="true">
        {number}
      </span>

      <div className="eyebrow reveal reveal--left reveal-s0">
        <div className="eyebrow__line" />
        <span className="eyebrow__label">
          {number} — {label}
        </span>
      </div>

      <h2 className="section-title-heading reveal reveal-s1">{title}</h2>

      {subtitle && <p className="section-title-subtitle reveal reveal-s2">{subtitle}</p>}
    </div>
  );
}

import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: '-4px',
          fontFamily: 'sans-serif',
        }}
      >
        KN
      </div>
    ),
    { ...size }
  );
}

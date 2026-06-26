import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '-1px',
        fontFamily: 'sans-serif',
      }}
    >
      KN
    </div>,
    { ...size }
  );
}

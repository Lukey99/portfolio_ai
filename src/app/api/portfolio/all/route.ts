import { NextResponse } from 'next/server';
import { portfolioData } from '@/lib/mock-data';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(portfolioData);
}

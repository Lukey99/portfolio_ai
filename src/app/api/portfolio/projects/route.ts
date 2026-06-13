import { NextResponse } from 'next/server';
import { portfolioData } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(portfolioData.projects);
}

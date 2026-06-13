import { portfolioData } from '@/lib/mock-data';
import { MainLayout } from '@/components/templates/MainLayout';

// Uses mock data directly for reliability; the service + hooks are available
// for any client-side fetching needs.
export default function HomePage() {
  return <MainLayout data={portfolioData} />;
}

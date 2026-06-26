'use client';

import { useState, useEffect } from 'react';
import type { Portfolio } from '@/types/portfolio.types';
import { portfolioService } from '@/services/portfolio.service';

export function usePortfolio() {
  const [data, setData] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    portfolioService
      .getPortfolio()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

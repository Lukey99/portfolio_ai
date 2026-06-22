export const usePathname = () => '/';

export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  back: () => {},
  forward: () => {},
  prefetch: () => {},
  refresh: () => {},
});

export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});

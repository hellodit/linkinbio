"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type RoutePrefetchProps = {
  hrefs: string[];
  limit?: number;
};

export function RoutePrefetch({ hrefs, limit = 10 }: RoutePrefetchProps) {
  const router = useRouter();

  React.useEffect(() => {
    if (!Array.isArray(hrefs) || hrefs.length === 0) {
      return;
    }

    const unique = Array.from(new Set(hrefs)).slice(0, limit);

    const prefetchAll = () => {
      unique.forEach((href) => {
        try {
          router.prefetch(href);
        } catch {
          // ignore
        }
      });
    };

    if (typeof (window as any).requestIdleCallback === "function") {
      const id = (window as any).requestIdleCallback(prefetchAll, { timeout: 2000 });
      return () => (window as any).cancelIdleCallback?.(id);
    }

    const id = window.setTimeout(prefetchAll, 300);
    return () => window.clearTimeout(id);
  }, [hrefs, limit, router]);

  return null;
}

export default RoutePrefetch;


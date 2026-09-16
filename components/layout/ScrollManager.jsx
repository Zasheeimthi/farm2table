'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Reproduces the two global effects of the old single-page shell:
 * smooth scroll-to-top on navigation, and the `.scroll-reveal` / `.image-reveal`
 * IntersectionObserver (now also watching for nodes added by filtering and
 * pagination).
 */
export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const seen = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    const scan = () => {
      document.querySelectorAll('.scroll-reveal, .image-reveal').forEach((item) => {
        if (seen.has(item)) return;
        seen.add(item);
        observer.observe(item);
      });
    };

    scan();
    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutation.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

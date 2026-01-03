'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const externalUrl = 'https://forms.gle/QQVh5Lu3VFaV4wgm8';
    router.push(externalUrl);
  }, [router]);

  return null;
};

export default RedirectPage;


import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/default'); // Redirect to home page
  }, []);
  return null; // Won't be seen since we're redirecting immediately
}

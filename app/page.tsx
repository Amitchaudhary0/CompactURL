'use client';
import Link from 'next/link';
    import { useEffect, useState } from 'react';

    export default function Home() {
      const [animationClass, setAnimationClass] = useState('opacity-0');

      useEffect(() => {
        setTimeout(() => {
          setAnimationClass('opacity-100 transition-opacity duration-1000');
        }, 300);
      }, []);

      return (
        <main className="flex flex-col justify-center items-center h-screen">
          <div className={`text-center ${animationClass}`}>
            <h1 className="text-4xl font-bold mb-4">Welcome to CompactURL</h1>
            <p className="text-lg mb-8">Shorten your URLs quickly and easily</p>
            <Link href="/compactURL"
              className="px-4 py-2 bg-amber-800 shadow-black shadow-md text-white rounded-full active:scale-110 transition-all active:bg-amber-600 font-bold"
            > Get Started </Link>
          </div>


    </main>
  );
}

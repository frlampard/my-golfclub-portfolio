import { useMemo, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';

type GolfClub = {
  id: number;
  name: string;
  location: string;
  visited_date: string | null;
  type: string;
  cafeteria: boolean;
  cafeteria_fee: string;
  sleeping_lounge: boolean;
  sleeping_lounge_size: string;
};

type HomePageProps = {
  golfclubs: GolfClub[];
};

export default function HomePage({ golfclubs }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGolfclubs = useMemo(() => {
    return golfclubs.filter((club) =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, golfclubs]);

  return (
    <>
      <Head>
        <title>GolfClub Portfolio</title>
      </Head>
      <main className='min-h-screen flex flex-col items-center justify-start bg-white p-0'>
        <section className='w-full max-w-md mx-auto bg-white'>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 text-center">
          🏌️‍♂️ Welcome to My GolfClub Portfolio 🏌️‍♂️
          </h1>

          <div className='mt-4 w-full'>
            <div className='mx-auto w-[70%] min-w-0'>
  <input
    id="search"
    type="text"
    placeholder="검색..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-[16px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
  />
  </div>
</div>

        {/* Mobile */}
        <ul className='mt-0 space-y-0'>
          {filteredGolfclubs.length > 0 ? (
            filteredGolfclubs.map((club, index) => (
              <li key={club.id}>
                <Link href={`/golf/${club.id}`}>
                <span className='w-10 shrink-0 text-[11px] tabular-nums font-semibold text-emerald-700/80'>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className='ml-3 flex-1 text-sm font-medium text-gray-900 min-w-0 truncate'>
                ⛳️{club.name}
                </span>
                </Link>
              </li>
            ))
          ) : (
            <li className='py-8 text-center text-slate-500'>검색 결과가 없습니다.</li>
          )}
        </ul>

        {/* Desktop */}
        <div className='hidden lg:block'>
  <ul className='mt-0 space-y-0'>
    {filteredGolfclubs.length > 0 ? (
      filteredGolfclubs.map((club, index) => (
        <li key={club.id}>
          <Link href={`/golf/${club.id}`} className='flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200'>
            <span className='ml-3 flex-1 text-sm font-medium text-gray-900'>
              {club.name}
            </span>
            <span className='text-xs text-gray-500'>{club.location}</span>
            <svg className='h-5 w-5 text-gray-400 ml-2' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M9 18l6-6-6-6' />
            </svg>
          </Link>
        </li>
      ))
    ) : (
      <li className='p-4 text-center text-gray-500 text-sm'>검색 결과가 없습니다.</li>
    )}
  </ul>
</div>
        </section>
      </main>
    </>
  );
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/golfclubs`);
  const data = await res.json();

  return {
    props: {
      golfclubs: Array.isArray(data.golfclubs) ? data.golfclubs : []
    }
  }
};

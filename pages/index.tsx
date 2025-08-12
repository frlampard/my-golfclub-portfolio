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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 ppx-3 py-6">
        <section className="w-full max-w-3xl mx-auto rounded-2xl bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-xl ring-1 ring-slate-200 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 text-center">
          🏌️‍♂️ Welcome to My GolfClub Portfolio 🏌️‍♂️
          </h1>

        <div className="mt-4">
          <label htmlFor="search" className="sr-only">골프장 검색</label>
          <input
            id="search"
            type="text"
            placeholder="골프장 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-wd mx-auto block rounded-xl border border-slate-300 px-4 py-3 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/50"
          />
        </div>

        <ul className='mt-4 divide-y divide-slate-200 md:hidden'>
          {filteredGolfclubs.length > 0 ? (
            filteredGolfclubs.map((club, index) => (
              <li>
                <Link href={`/golf/${club.id}`} className='flex items-center gap-3 py-4 outline-none transition active:translate-y-[1px] hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400/50'>
                <span className='w-10 shring-0 text-xs tabular-nums text-slate-400'>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className='flex-1 truncate text-base font-medium text-slate-900'>
                  {club.name}
                </span>
                <span aria-hidden className='text-xl text-slate-300'>›</span>
                </Link>
              </li>
            ))
          ) : (
            <li className='py-8 text-center text-slate-500'>검색 결과가 없습니다.</li>
          )}
        </ul>

        <div className='mt-6 hidden md:block'>
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className='p-2 w-16 text-slate-500'>No.</th>
              <th className="border p-2">골프장 이름</th>
            </tr>
          </thead>
          <tbody>
            {filteredGolfclubs.length > 0 ? (
              filteredGolfclubs.map((club, index) => (
                <tr key={club.id} className="hover:bg-gray-50">
                  <td className='p-2 text-slate-500 tabular-nums'>{ index+1 }</td>
                  <td className="border p-2">
                    <Link href={`/golf/${club.id}`} className="text-blue-600 hover:underline">
                      {club.name}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="border p-2 text-center text-gray-500">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        </section>
      </main>
    </>
  );
}

// 날짜 포맷 유틸 함수
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A'; // 혹은 '-'
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// SSR 데이터 패칭
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/golfclubs`);
  const data = await res.json();

  //console.log('✅ data:', data);
  //console.log('✅ array check:', Array.isArray(data.golfclobs));
  //console.log("✅ API 응답 golfclubs:", golfclubs);
  console.log("🟢 API fetch 결과:", data);
  console.log("🟢 데이터 타입:", typeof data);
  console.log("🟢 배열인가?", Array.isArray(data));

  return {
    props: {
      golfclubs: Array.isArray(data.golfclubs) ? data.golfclubs : []
    }
  }
};

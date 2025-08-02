// pages/index.tsx
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';

type GolfClub = {
  id: number;
  name: string;
  location: string;
  visited_date: string;
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
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">🏌️‍♂️ Welcome to My GolfClub Portfolio 🏌️‍♂️</h1>

        <input
          type="text"
          placeholder="골프장 이름 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full max-w-md"
        />

        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">골프장 이름</th>
              <th className="border p-2">위치</th>
              <th className="border p-2">최근 방문일</th>
              <th className="border p-2">타입</th>
            </tr>
          </thead>
          <tbody>
            {filteredGolfclubs.length > 0 ? (
              filteredGolfclubs.map((club) => (
                <tr key={club.id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    <Link href={`/golf/${club.id}`} className="text-blue-600 hover:underline">
                      {club.name}
                    </Link>
                  </td>
                  <td className="border p-2">{club.location}</td>
                  <td className="border p-2">{formatDate(club.visited_date)}</td>
                  <td className="border p-2">{club.type}</td>
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
      </main>
    </>
  );
}

// 날짜 포맷 유틸 함수
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

// SSR 데이터 패칭
export const getServerSideProps: GetServerSideProps = async () => {
  const golfclubs = await prisma.golfclubs.findMany({
    orderBy: { visited_date: 'desc' },
  });

  const serialized = golfclubs.map((club) => ({
    ...club,
    visited_date: club.visited_date
      ? new Date(club.visited_date).toISOString()
      : null, // visited_date가 null일 경우 처리
  }));

  return { props: { golfclubs: serialized } };
};

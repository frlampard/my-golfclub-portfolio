import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';
import Head from 'next/head';

export default function GolfclubDetail({ club }: { club: any }) {
  return (
    <>
      <Head>
        <title>{club.name} - 상세 정보</title>
      </Head>
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{club.name}</h1>
        <table className="table-auto border-collapse border w-full text-sm">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">위치</td>
              <td className="border px-4 py-2">{club.location}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">방문일</td>
              <td className="border px-4 py-2">{new Date(club.visited_date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">타입</td>
              <td className="border px-4 py-2">{club.type}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">식당 여부</td>
              <td className="border px-4 py-2">{club.cafeteria ? '예' : '아니오'}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">식당 요금</td>
              <td className="border px-4 py-2">{club.cafeteria_fee}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">휴게실 여부</td>
              <td className="border px-4 py-2">{club.sleeping_lounge ? '예' : '아니오'}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">휴게실 크기</td>
              <td className="border px-4 py-2">{club.sleeping_lounge_size}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}

// 서버 측 데이터 패칭
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  const club = await prisma.golfclubs.findUnique({
    where: { id: Number(id) },
  });

  if (!club) {
    return { notFound: true };
  }

  const serialzedClub = {
    ...club,
    visited_date: club.visited_date
    ? club.visited_date.toISOString()
    : null,
  };

  return {
    props: { club: serialzedClub },
  };
};

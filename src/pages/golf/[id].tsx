import { GetServerSideProps } from 'next';
import { prisma } from '../../lib/prisma';
import Head from 'next/head';
import VisitorView from '../../components/golf/visiterView';
import DriverView from '../../components/golf/driverView';
import visiterData from '../../data/visiterData.json';
import { useState } from 'react';
import { GolfClub } from '../../types/golfs';
import React from 'react';

export default function GolfclubDetail({ club: serverClub }: { club: GolfClub | null }) {
  const [isVisiterView, setIsVisiterView] = useState(false);
  const club = visiterData.find((c) => c.id === '1');

  if (!club) return <div>❌Data 불러오기 실패❌</div>

  //console.log('isVisiterView:', isVisiterView);

  return (
    <>
      <Head>
        <title>{club.name} - 상세 정보</title>
      </Head>
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">⛳️ {club.name}</h1>
        <div className='flex'>
        <button
            onClick={() => setIsVisiterView(false)}
            className={`px-3 py-1 rounded text-sm ${!isVisiterView ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'} hover:opacity-90`}
          >
            일반용
          </button>
          <button
            onClick={() => setIsVisiterView(true)}
            className={`px-3 py-1 rounded text-sm ${isVisiterView ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:opacity-90`}
          >
            기사용
          </button>
        </div>
        {isVisiterView ? <DriverView club={club} /> : <VisitorView club={club} />}
      </main>
    </>
  );
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const visitorData = require('../../data/visiterData.json');
  const club = visitorData.find((c: GolfClub) => c.id === params.id);
  return { props: { club: club || null } };
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const id = context.params?.id;

//   const club = await prisma.golfclubs.findUnique({
//     where: { id: Number(id) },
//   });

//   if (!club) {
//     return { notFound: true };
//   }

//   const serialzedClub = {
//     ...club,
//     visited_date: club.visited_date
//     ? club.visited_date.toISOString()
//     : null,
//   };

//   return {
//     props: { club: serialzedClub },
//   };
// };
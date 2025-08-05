import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const golfclubs = await prisma.golfclubs.findMany({
      orderBy: { visited_date: 'desc' }
    });

    //console.log("API 응답:", golfclubs);
    res.status(200).json({golfclubs});
  } catch (error) {
    //console.error("DB 요청 실패:", error);
    res.status(500).json({ error: 'DB 요청 실패' });
  }
}

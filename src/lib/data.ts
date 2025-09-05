import { GetServerSideProps } from 'next';
import golfclubData from '@/data/golfclubData.json';
import { GolfClub } from '../types/golfs';

export interface ExtraGolfClubFields {
  visitedDate?: string | null;
  cafeteria?: string;
  cafeteriaFee?: string;
  sleepingLounge?: string;
  sleepingLoungeSize?: string;
}

export type ExtendedGolfClub = GolfClub & ExtraGolfClubFields;

export type HomePageProps = {
  golfclubs: ExtendedGolfClub[];
};

const isTestMode = process.env.NODE_ENV === 'development';

export async function getGolfClubs(): Promise<ExtendedGolfClub[]> {
  if (isTestMode) {
    return Array.isArray(golfclubData)
      ? golfclubData.map((club) => {
          const baseClub: Partial<GolfClub> = {
            id: club.id || '',
            name: club.name || '',
            location: club.location || '',
            type: club.type || '',
            ownership: '',
            hole_size: '',
            level: '',
            green_fee: '',
            cart_fee: '',
            caddie_fee: '',
          };
          return {
            ...baseClub,
            visitedDate: club.visitedDate || null,
            cafeteria: club.cafeteria || 'No',
            cafeteriaFee: club.cafeteriaFee || '',
            sleepingLounge: club.sleepingLounge || 'No',
            sleepingLoungeSize: club.sleepingLoungeSize || '',
          } as ExtendedGolfClub;
        })
      : [];
  } else {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
      if (!baseUrl) {
        console.warn('NEXT_PUBLIC_API_BASE_URL is not defined, using default');
        return [];
      }
      const res = await fetch(`${baseUrl}/api/golfclubs`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json() as { golfclubs?: ExtendedGolfClub[] };
      return Array.isArray(data.golfclubs)
        ? data.golfclubs.map((club) => ({
            id: club.id,
            name: club.name,
            location: club.location,
            type: club.type,
            ownership: club.ownership || '',
            hole_size: club.hole_size || '',
            level: club.level || '',
            green_fee: club.green_fee || '',
            cart_fee: club.cart_fee || '',
            caddie_fee: club.caddie_fee || '',
            visitedDate: club.visitedDate || null,
            cafeteria: club.cafeteria || 'No',
            cafeteriaFee: club.cafeteriaFee || '',
            sleepingLounge: club.sleepingLounge || 'No',
            sleepingLoungeSize: club.sleepingLoungeSize || '',
          }))
        : [];
    } catch (error) {
      console.error('Error fetching golf clubs:', error);
      return [];
    }
  }
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const golfclubs = await getGolfClubs();
  return { props: { golfclubs } };
};
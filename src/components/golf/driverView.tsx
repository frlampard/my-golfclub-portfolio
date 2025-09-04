// import { golfclubs } from "@prisma/client";

// export default function driverView({club}) : {club:golfclubs} {
//     return
//     <table className="table-auto border-collapse border w-full text-sm">
//           <tbody>
//             <tr>
//               <td className="border px-4 py-2 font-semibold text-center">위치</td>
//               <td className="border px-4 py-2">{club.location}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold text-center">방문일</td>
//               <td className="border px-4 py-2">{new Date(club.visited_date).toLocaleDateString()}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold text-center">타입</td>
//               <td className="border px-4 py-2">{club.type}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold text-center">식당 여부</td>
//               <td className="border px-4 py-2">{club.cafeteria ? '예' : '아니오'}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold text-center">식당 요금</td>
//               <td className="border px-4 py-2">{club.cafeteria_fee}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold text-center">휴게실 여부</td>
//               <td className="border px-4 py-2">{club.sleeping_lounge ? '예' : '아니오'}</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2 font-semibold text-center">휴게실 크기</td>
//               <td className="border px-4 py-2">{club.sleeping_lounge_size}</td>
//             </tr>
//           </tbody>
//         </table>
// }

import React from 'react';
import { GolfClub } from '../../types/golfs';

type DriverViewProps = {
  club: GolfClub;
};

const DriverView: React.FC<DriverViewProps> = ({ club }) => {
  return (
    <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-2">
      <h2 className="text-sm font-medium text-gray-900">기사용 정보</h2>
      <p className="text-xs text-gray-500">구내식당: {club.name}</p>
      <p className="text-xs text-gray-500">대기실: {club.location}</p>
    </div>
  );
};

export default DriverView;
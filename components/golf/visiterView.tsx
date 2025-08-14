import React from 'react';
import { GolfClub } from '@/types/golfs';

type VisitorViewProps = {
  club: GolfClub;
};

const VisitorView: React.FC<VisitorViewProps> = ({ club }) => {
  return (
    <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-2">
      <h2 className="text-sm font-medium text-gray-900">일반 정보</h2>
      <p className="text-xs text-gray-500">이름: {club.name}</p>
      <p className="text-xs text-gray-500">위치: {club.location}</p>
      <p className="text-xs text-gray-500">타입: {club.type}</p>
      <p className="text-xs text-gray-500">소유권: {club.ownership}</p>
      <p className="text-xs text-gray-500">홀 수: {club.hole_size}</p>
      <p className="text-xs text-gray-500">난이도: {club.level}</p>
      <p className="text-xs text-gray-500">그린 비용: {club.green_fee}</p>
      <p className="text-xs text-gray-500">카트 비용: {club.cart_fee}</p>
      <p className="text-xs text-gray-500">캐디 비용: {club.caddie_fee}</p>
    </div>
  );
};

export default VisitorView;
import { GolfClub } from '../../types/golfs';
import { useState, useMemo } from 'react';

export default function useHomeLogic(initialGolfclubs: GolfClub[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  const filteredGolfclubs = useMemo(() => {
    let result = [...(initialGolfclubs || [])];
    result = result.filter((club) =>
      club?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    );
    if (isSorted) {
      result.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    }
    return result;
  }, [searchTerm, initialGolfclubs, isSorted]);

  const handleSort = () => setIsSorted(true);
  const handleResetSort = () => setIsSorted(false);

  return {
    searchTerm,
    setSearchTerm,
    filteredGolfclubs,
    isSorted,
    handleSort,
    handleResetSort,
  };
}
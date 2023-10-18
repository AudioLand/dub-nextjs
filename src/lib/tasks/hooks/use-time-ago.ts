import { useCallback } from 'react';
import { formatDistance } from 'date-fns';

function useTimeAgo() {
  return useCallback((date: Date) => {
    return formatDistance(date, new Date(), {
      addSuffix: true,
    });
  }, []);
}

export default useTimeAgo;

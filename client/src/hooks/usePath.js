import { useSearchParams } from 'react-router-dom';

export function usePath() {
  const [searchParams, setSearchParams] = useSearchParams();

  const path = searchParams.get('path') || '/';
  return {
    currentPath: path,
    setCurrentPath: setSearchParams,
  };
}

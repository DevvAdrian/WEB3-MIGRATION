import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { BigNumber } from 'ethers';
import useRefresh from './useRefresh';

const useNewToken = () => {
  const [newToken, setNewToken] = useState<String>();
  const tombFinance = useTombFinance();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    async function fetchNewToken() {
      try {
        setNewToken(await tombFinance.getNewName());
      } catch(err) {
        console.error(err);
      }
    }
    fetchNewToken();
  }, [setNewToken, slowRefresh, tombFinance]);

  return newToken;
};

export default useNewToken;

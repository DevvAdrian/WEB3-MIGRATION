import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { BigNumber } from 'ethers';
import useRefresh from './useRefresh';

const useOldToken = () => {
  const [oldToken, setOldToken] = useState<String>();
  const tombFinance = useTombFinance();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    async function fetchOldToken() {
      try {
        setOldToken(await tombFinance.getOldName());
      } catch(err) {
        console.error(err);
      }
    }
    fetchOldToken();
  }, [setOldToken, slowRefresh, tombFinance]);

  return oldToken;
};

export default useOldToken;

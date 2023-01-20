import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';
import { BigNumber } from 'ethers';

const useOldatio = () => {
  const [oldRatio, setOldRatio] = useState( BigNumber.from(0) );
  const tombFinance = useTombFinance();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    async function fetchOldRatio() {
      try {
        setOldRatio(await tombFinance.getOldRatio());
      } catch(err) {
        console.error(err);
      }
    }
    fetchOldRatio();
  }, [setOldRatio, slowRefresh, tombFinance]);

  return oldRatio;
};

export default useOldatio;

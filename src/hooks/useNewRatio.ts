import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';
import { BigNumber } from 'ethers';

const useNewRatio = () => {
  const [newRatio, setNewRatio] = useState( BigNumber.from(0) );
  const tombFinance = useTombFinance();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    async function fetchNewRatio() {
      try {
        setNewRatio(await tombFinance.getNewRatio());
      } catch(err) {
        console.error(err);
      }
    }
    fetchNewRatio();
  }, [setNewRatio, slowRefresh, tombFinance]);

  return newRatio;
};

export default useNewRatio;

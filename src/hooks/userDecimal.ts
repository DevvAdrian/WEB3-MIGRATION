import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { BigNumber } from 'ethers';
import useRefresh from './useRefresh';

const useDeciaml = () => {
  const [decimal, setDecimal] = useState(BigNumber.from(0));
  const tombFinance = useTombFinance();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    async function fetchDecimal() {
      try {
        setDecimal(await tombFinance.getDecimal());
      } catch(err) {
        console.error(err);
      }
    }
    fetchDecimal();
  }, [setDecimal, slowRefresh, tombFinance]);

  return decimal;
};

export default useDeciaml;

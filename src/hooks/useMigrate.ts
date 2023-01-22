import { useCallback/*, useEffect, useMemo*/ } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useMigrate = () => {
  const tombFinance = useTombFinance();


  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleMigrate = useCallback(
    (oldAmount: string) => {
      handleTransactionReceipt(
        tombFinance.migrate(oldAmount),
        `Migrate ${oldAmount} DGTL To WEB3.0 `,
      );
    },
    [tombFinance, handleTransactionReceipt],
  );

  return { onMigrate: handleMigrate };
};

export default useMigrate;

import { useCallback, useEffect, useState } from "react";

const useFetching = <D>(fetchFunc: () => Promise<D>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<D>();

  const refresh = useCallback(() => {
    setIsError(false);
    setIsLoading(true);
    fetchFunc()
      .then((data) => {
        setData(data);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchFunc]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { isLoading, isError, data, refresh };
};

export default useFetching;

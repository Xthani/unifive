import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useParam = (name: any, value?: string) => {
  // const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // const params = useMemo(
  //   () => new URLSearchParams(searchParams),
  //   [searchParams],
  // );
  const param = searchParams.get(name);

  // удаляет param
  const deleteQueryParam = useCallback(() => {
    searchParams.delete(name);
    setSearchParams(searchParams);
  }, [name, searchParams, setSearchParams]);

  // добавляет param
  const updateQueryParam = useCallback(
    (newValue: string) => {
      searchParams.set(name, newValue);
      setSearchParams(searchParams);

      // router.push(pathname + newUrl, { scroll: false });
    },
    [name, searchParams, setSearchParams],
  );

  // добавляет param и стирает все остальное
  const updateQueryParamWithResetAnother = useCallback(
    (newValue: string) => {
      searchParams.set(name, newValue);
      setSearchParams(searchParams);
      // router.push(newUrl, { scroll: false });
    },
    [name, searchParams, setSearchParams],
  );

  return {
    updateQueryParam,
    deleteQueryParam,
    updateQueryParamWithResetAnother,
    searchParams,
    param,
  };
};

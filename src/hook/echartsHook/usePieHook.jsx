import { useMemo } from 'react';

const usePieHook = ({ data = [], op = {}, series = {} }) => {

  const option = useMemo(() => {

    if (Object.keys(series).length > 0) {
      return {
        series,
        ...op
      };
    }

    return {
      series: {
        type: 'pie',
        data,
      },
      ...op
    };
  }, [data, op, series]);

  return option;
};

export default usePieHook;
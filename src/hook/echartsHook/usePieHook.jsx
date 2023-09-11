import { useMemo } from 'react';

// 使用usePieHook函数，传入参数data、op、series
const usePieHook = ({ data = [], op = {}, series = {} }) => {

  // 使用useMemo函数，传入参数option，用于拼接option
  const option = useMemo(() => {

    // 如果series存在，则返回series，否则返回op
    if (Object.keys(series).length > 0) {
      return {
        series,
        ...op
      };
    }

    // 否则返回series，op
    return {
      series: {
        type: 'pie',
        data,
      },
      ...op
    };
  }, [data, op, series]);

  // 返回option
  return option;
};

export default usePieHook;
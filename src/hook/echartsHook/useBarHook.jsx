import { useMemo } from 'react';

const useBarHook = ({
  xAxis = { type: 'category', data: [] },
  yAxis = { type: 'value' },
  series = [{ data: [], type: 'bar' }],
  dataX = [],
  dataY = [],
  op = {}
}) => {
  const option = useMemo(() => {
    const xAxisConfig = (xAxis !== false && (Array.isArray(series) || series.length === 1)) ? { type: 'category', data: dataX } : xAxis;
    const yAxisConfig = (yAxis !== false) ? yAxis : undefined;
    const seriesConfig = Array.isArray(series) ? series : [series];
    return {
      ...(xAxisConfig && { xAxis: xAxisConfig }),
      ...(yAxisConfig && { yAxis: yAxisConfig }),
      series: seriesConfig.map((s, index) => {
        if (index === 0 && seriesConfig.length === 1) {
          return {
            ...s,
            data: s.data.length > 0 ? s.data : dataY
          };
        }
        return s;
      }),
      ...op
    };
  }, [xAxis, yAxis, series, dataX, dataY, op]);

  return option;
};

export default useBarHook;
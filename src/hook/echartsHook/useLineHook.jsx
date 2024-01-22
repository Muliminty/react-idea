import { useMemo } from 'react';

const useLineHook = ({
  xAxis = { type: 'category', data: [] },
  series = [{ data: [], type: 'line' }],
  yAxis = { type: 'value' },
  dataX = [],
  dataY = [],
  op = {}
}) => {
  const option = useMemo(() => {
    const xAxisConfig = (xAxis && (Array.isArray(series) || typeof series === 'object')) ? { ...xAxis, data: dataX } : xAxis;
    const yAxisConfig = yAxis ? { ...yAxis } : undefined;
    const seriesConfig = Array.isArray(series) ? series : [series];
    const processedSeries = seriesConfig.map((s) => {
      const processedData = s.data.length > 0 ? s.data : dataY;
      return { ...s, data: processedData };
    });
    return {
      ...(xAxisConfig && { xAxis: xAxisConfig }),
      ...(yAxisConfig && { yAxis: yAxisConfig }),
      series: processedSeries,
      ...op
    };
  }, [xAxis, series, dataX, dataY, yAxis, op]);

  return option;
};

export default useLineHook;

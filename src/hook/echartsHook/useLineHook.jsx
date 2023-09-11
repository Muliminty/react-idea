import { useMemo } from 'react';

// 使用useMemo函数，将xAxis、series、yAxis、dataX、dataY、op参数传入，并返回一个option
const useLineHook = ({
  xAxis = { type: 'category', data: [] },
  series = [{ data: [], type: 'line' }],
  yAxis = { type: 'value' },
  dataX = [],
  dataY = [],
  op = {}
}) => {
  // 使用useMemo函数，将xAxis、series、yAxis、dataX、dataY、op参数传入，并返回一个option
  const option = useMemo(() => {
    // 如果xAxis、series、yAxis、dataX、dataY、op参数都存在，则使用xAxis、series、yAxis、dataX、dataY、op参数，否则使用默认值
    const xAxisConfig = (xAxis && (Array.isArray(series) || typeof series === 'object')) ? { ...xAxis, data: dataX } : xAxis;
    const yAxisConfig = (yAxis) ? { ...yAxis } : undefined;
    const seriesConfig = (Array.isArray(series)) ? series : [series];
    // 将seriesConfig中的数据处理，如果数据长度大于0，则使用seriesConfig中的数据，否则使用dataY
    const processedSeries = seriesConfig.map((s) => {
      const processedData = s.data.length > 0 ? s.data : dataY
      return { ...s, data: processedData };
    });
    // 返回一个option，包含xAxis、yAxis、series、op参数
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
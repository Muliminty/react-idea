import { useMemo } from 'react';

// 使用useMemo函数，用于在组件内部使用缓存
const useBarHook = ({
  // xAxis参数，默认值为空对象，表示x轴不可用
  xAxis = { type: 'category', data: [] },
  // yAxis参数，默认值为空对象，表示y轴不可用
  yAxis = { type: 'value' },
  // series参数，默认值为空数组，表示没有纵轴
  series = [{ data: [], type: 'bar' }],
  // dataX参数，默认值为空数组，表示没有x轴
  dataX = [],
  // dataY参数，默认值为空数组，表示没有y轴
  dataY = [],
  // op参数，默认值为空对象
  op = {}
}) => {
  // 使用useMemo函数，用于在组件内部使用缓存
  const option = useMemo(() => {
    // 如果xAxis参数为false，则x轴不可用，否则按照series参数判断
    const xAxisConfig = (xAxis !== false && (Array.isArray(series) || series.length === 1)) ? { type: 'category', data: dataX } : xAxis;
    // 如果yAxis参数为false，则y轴不可用，否则设置为undefined
    const yAxisConfig = (yAxis !== false) ? yAxis : undefined;
    // 如果series参数为数组，则按照series参数判断，否则设置为series
    const seriesConfig = Array.isArray(series) ? series : [series];
    // 返回option参数
    return {
      ...(xAxisConfig && { xAxis: xAxisConfig }),
      ...(yAxisConfig && { yAxis: yAxisConfig }),
      series: seriesConfig.map((s, index) => {
        // 如果series参数中的第一个元素为空数组，则按照dataY参数判断，否则设置为s.data
        if (index === 0 && seriesConfig.length === 1) {
          return {
            ...s,
            data: s.data.length > 0 ? s.data : dataY
          };
        }
        // 返回s
        return s;
      }),
      ...op
    };
  }, [xAxis, yAxis, series, dataX, dataY, op]);

  // 返回option参数
  return option;
};

export default useBarHook;
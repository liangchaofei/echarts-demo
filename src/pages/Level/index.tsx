import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import './index.less';

function App() {
  const yData = [1, 2, 3, 4];
  const xData = [1, 2, 3, 4];
  const options = {
    tooltip: {
      trigger: 'axis',
      position: function (pt: any) {
        return [pt[0], '10%'];
      },
    },
    toolbox: {
      show: false,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: yData,
    },
    yAxis: {
      name: '推理时长（ms）',
      type: 'value',
      boundaryGap: [0, '100%'],
    },

    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)',
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)',
            },
          ]),
        },
        data: xData,
      },
    ],
  };
  const chartRef = useRef<HTMLDivElement>(null);
  let chart: echarts.ECharts | null = null;

  useEffect(() => {
    if (!chart) {
      chart = echarts.init(chartRef.current as HTMLDivElement);
    }
    chart.setOption(options);
  }, [options]);

  return (
    <div className="App">
      <div ref={chartRef} className="chart" />
    </div>
  );
}

export default App;

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import './index.less';

function App() {
  const data = {
    xData: ['分布1', '分布2', '分布3', '分布4', '分布5', '分布6', '分布7'],
    yData: [
      {
        value: 100,
        color: '#a90000',
      },
      {
        value: 120,
        color: '#531212',
      },
      {
        value: 140,
        color: '#233412',
      },
      {
        value: 150,
        color: '#431254',
      },
      {
        value: 170,
        color: '#652341',
      },
      {
        value: 190,
        color: '#235753',
      },
      {
        value: 200,
        color: '#121912',
      },
    ],
  };

  const newData = data.yData.map((item) => {
    return {
      value: item.value,
      itemStyle: {
        color: item.color,
      },
    };
  });
  const options = {
    xAxis: {
      type: 'category',
      data: data.xData,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      position: function (pt: any) {
        return [pt[0], '10%'];
      },
    },
    series: [
      {
        data: newData,
        type: 'bar',
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

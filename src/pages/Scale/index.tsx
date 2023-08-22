import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "./index.less";

function App() {
  const options = {
    xAxis: {
      type: 'category',
      data: [1,2,3,4,5,6,7]
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 0,
        end: 100
      },
      {
        show: false,
        xAxisIndex: [0, 1],
        type: 'slider',
        bottom: 10,
        start: 10,
        end: 100
      }
    ],
  };
  const chartRef = useRef<HTMLDivElement>(null);
  let chart: echarts.ECharts | null = null;
  
  useEffect(() => {
    if (!chart) {
      chart = echarts.init(chartRef.current as HTMLDivElement);
    }
    chart.setOption(options);
 
    chart.on('brushSelected', (params) => {
      console.log('brushSelected', params)
    });
  }, [options]);

  return (
    <div className="App">
      <h1>React Echarts Demo</h1>
      <div
        ref={chartRef}
        className="chart"
      ></div>
    </div>
  );
}

export default App;

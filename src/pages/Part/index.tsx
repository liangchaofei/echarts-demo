import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "./index.less";

function App() {
  let yAxisData = [150, 230, 224, 218, 135, 147, 260];
  let xAxisData = [1,2,3,4,5,6,7]
  const options = {
    xAxis: {
      type: 'category',
      data: xAxisData,
      boundaryGap: false,
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
        data: yAxisData,
        type: 'line'
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: 0,
      }
    ],
    toolbox: {
      feature: {
        dataZoom: {
          show: true
        }
      }
    }
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
      <h1>React Echarts Demo</h1>
      <div
        ref={chartRef}
        className="chart"
      ></div>
    </div>
  );
}

export default App;

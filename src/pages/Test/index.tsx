import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import lodash from 'lodash';
import "./index.less";

function App() {
    function func(s) {
        let x =  s / 10;
        return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 50;
      }
      function generateData() {
        let data = [];
        for (let i = -200; i <= 200; i += 0.1) {
          data.push([i, func(i)]);
        }
        return data;
      }
  const options = {
    xAxis: {
        name: 'x',
      },
      yAxis: {
        name: 'y',
        min: -100,
        max: 100,
      },
      dataZoom: [
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          xAxisIndex: [0],
          startValue: -20,
          endValue: 20
        },
        {
          show: true,
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: [0],
          startValue: -20,
          endValue: 20
        }
      ],
      series: [
        {
          type: 'line',
          showSymbol: false,
          clip: true,
          data: generateData()
        }
      ]
  };
  const chartRef = useRef<HTMLDivElement>(null);
  let chart: echarts.ECharts | null = null;
  
  useEffect(() => {
    if (!chart) {
      chart = echarts.init(chartRef.current as HTMLDivElement);
    }

    chart.setOption(options);

    
    chart.on('datazoom', lodash.debounce(params => {
        const xAxisModel = chart.getModel().getComponent('xAxis', 0); // Assuming x-axis index is 0
        if (xAxisModel) {
            const interval = xAxisModel.axis.scale.getInterval();
            console.log('interval', interval)
        const zoom = chart.getModel().getOption().dataZoom[0]; // Assuming dataZoom index is 0
        console.log('zoom', zoom)
        }
    }, 1000));

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

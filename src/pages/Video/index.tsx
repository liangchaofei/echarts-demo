import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import './index.less'

function App() {
    let now = new Date(1997, 9, 3);
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
    function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
          name: now.toString(),
          value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
          ]
        };
      }
    let data = [];

for (let i = 0; i < 1000; i++) {
  data.push(randomData());
}

  const options = {
    title: {
        text: 'Dynamic Data & Time Axis'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          let date = new Date(params.name);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' : ' +
            params.value[1]
          );
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: 'Fake Data',
          type: 'line',
          showSymbol: false,
          data: data
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
    setInterval(function () {
        for (let i = 0; i < 5; i++) {
          data.shift();
          data.push(randomData());
        }
        chart.setOption({
          series: [
            {
              data: data
            }
          ]
        });
      }, 1000);
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

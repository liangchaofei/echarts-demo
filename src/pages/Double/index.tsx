import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "./index.less";

function App() {
  const data = [150, 230, 224, 218, 135, 147, 260];
  const options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data,
        type: 'line'
      }
    ],
    graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            draggable: 'horizontal',
            ondrag: function (params) {
              var pointInPixel = [params.offsetX, params.offsetY];
              var pointInGrid = chart.convertFromPixel('grid', pointInPixel);

              var xTime = new Date(pointInGrid[0])

              //get closest value from cursor
              var point = data.reduce((prev, curr) => Math.abs(new Date(curr[0]).valueOf() - xTime.valueOf()) < Math.abs(new Date(prev[0]).valueOf() - xTime.valueOf()) ? curr : prev)

              //console.log('poi', new Date(pointInGrid[0]), new Date(point[0]), point[1])

              var d = document.getElementById('value2');
              d.style.left = params.offsetX + 'px';
              d.innerHTML = params.offsetX
            },
            children: [
              {
                id: 'bar1',
                type: 'rect',
                top: '30px',
                shape: {
                  width: 2,
                  height: 1385
                },
                style: {
                  fill: "#ff0000"
                },
                cursor: 'ew-resize'
              },
              // {
              //   type: 'circle',
              //   top: '740px',
              //   shape: {
              //     r: 10
              //   },
              //   style: {
              //     fill: "#ff0000"
              //   },
              // }
            ]
          },
          {
            type: 'group',
            left: '300px',
            draggable: 'horizontal',
            ondrag: function (params) {
              var pointInPixel = [params.offsetX, params.offsetY];
              var pointInGrid = chart.convertFromPixel('grid', pointInPixel);

              var xTime = new Date(pointInGrid[0])
              console.log(xTime);
              //get closest value from cursor
              var point = data.reduce((prev, curr) => Math.abs(new Date(curr[0]).valueOf() - xTime.valueOf()) < Math.abs(new Date(prev[0]).valueOf() - xTime.valueOf()) ? curr : prev)

              //console.log('poi', new Date(pointInGrid[0]), new Date(point[0]), point[1])

              var d = document.getElementById('value1');
              d.style.left = params.offsetX + 'px';
              d.innerHTML = params.offsetX
            },
            children: [
              {
                type: 'rect',
                top: '30px',
                shape: {
                  width: 2,
                  height: 1385
                },
                style: {
                  fill: "#0000ff"
                },
                cursor: 'ew-resize'
              },
            ]
          },
        ]
      },
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
      <div id="value1" style={{}}>0</div>
      <div id="value2">0</div>
      <div
        ref={chartRef}
        className="chart"
      ></div>
    </div>
  );
}

export default App;

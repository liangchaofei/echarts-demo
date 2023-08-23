import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "./index.less";

function App() {
  const data = [150, 230, 224, 218, 135, 147, 260];
  const options = {
    xAxis: {
      id: 'xAxis',
      type: 'value',
      boundaryGap: false,
      min: 0, // 设置 x 轴的最小值
    max: 10, // 设置 x 轴的最大值
      // data: [1,2,3,4,5,6,7]
    },
    yAxis: {
      type: 'value',
      data
    },
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'none'
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        filterMode: 'none'
      }
    ],
    series: [
      {
        data: [[1, 150], [3, 230], [5, 224], [7, 218], [9, 135]],
        smooth: true,
        type: 'line'
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    graphic: {
        elements: [
          {
            type: 'group',
            left: '300px',
            // draggable: 'horizontal',
            draggable: true,
            invisible: true,
           
            ondrag: function (params) {
              console.log('params', params)
              var pointInPixel = [params.offsetX, params.offsetY];
              var pointInGrid = chart.convertFromPixel('grid', pointInPixel);
              // var pointInXAxis = chart.convertFromPixel({ xAxisId: 'xAxis' }, params.offsetX);
              console.log('pointInGrid', pointInGrid)
             
              // var d = document.getElementById('value1');
              // d.style.left = params.offsetX + 'px';
              // d.innerHTML = params.offsetX
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
      <div
        ref={chartRef}
        className="chart"
      ></div>
    </div>
  );
}

export default App;

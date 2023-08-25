import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Button } from 'antd';
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
          show: true,
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

  const handleClick = () => {
    // 点击按钮 模拟  点击区域缩放按钮     
    console.log('chart', chart)   
    console.log('www', chart.getModel())
    let dataZoomComponent = chart.getModel().getComponent('dataZoom', 0);
    console.log('dataZoomComponent', dataZoomComponent)
    // 切换到区域缩放模式
    dataZoomComponent.option.zoomLock = false;
    // 手动开启区域缩放
    chart.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        dataZoomSelectActive: true
    });
  }

  return (
    <div className="App">
      <h1>React Echarts Demo</h1>
      <Button onClick={handleClick}>局部放大</Button>
      <div
        ref={chartRef}
        className="chart"
      ></div>
    </div>
  );
}

export default App;

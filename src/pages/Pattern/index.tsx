import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "./index.less";

function App() {
  let colors = ['#FD2446', '#248EFD', '#C916F2', '#6669B1'];//自定义一个颜色数组，多系时会按照顺序使用自己定义的颜色数组，若不定义则使用默认的颜色数组
  const options = {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    "axisTick": {       //y轴刻度线
      "show": true
    },
    yAxis: [
      {//第一个y轴位置在左侧
        position: 'left',
        type: 'value',
        id: '2',
        name: '单位数',
        show: true,
        axisTick: {
          show: true // 不显示坐标轴刻度线
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0]
          }
        },
        axisLabel: {
          formatter: '{value}'
        },
      },
      {//第二个y轴在右侧
        position: 'left',
        type: 'value',
        offset: 40,
        name: '职工数',
        axisTick: {
          show: true // 不显示坐标轴刻度线
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1]
          }
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      {//第三个y轴也在右侧，距第二个70个像素
        position: 'left',
        offset: 170,
        type: 'value',
        name: '平均工资',
        axisTick: {
          show: true // 不显示坐标轴刻度线
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[2]
          }
        },
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '单位数',
        type: 'line',
        id: 'aaa',
        yAxisIndex: '0',//使用第一个y轴，序号从0开始
        data: [23, 27, 28, 30, 34, 36, 39, 41, 45, 46, 56, 60],
        // markLine: {                      //开始标预警线
        //         itemStyle: {
        //             normal: {
        //                 borderWidth: 1,
        //                 lineStyle: {
        //                     type: 'dash',
        //                     color: '#333 ',
        //                     width: 2,
        //                 },
        //                 label: {
        //                     textStyle: {
        //                         fontSize: 16,
        //                         fontWeight: "bolder",
        //                     },
        //                 }
        //             },
        //         },
        //         data: [
        //             { yAxis: threshold, name: '阈值' },
        //         ],
        //     },
        //     itemStyle: {
        //         normal: {
        //             color: function (params) {      //根据预警线的值 显示对应的颜色      
        //                 // build a color map as your need.
        //                 var colorList = ['#c23531', '#c5bf66 '];
        //                 if (params.data > threshold) {
        //                     return colorList[0];
        //                 } else if (params.data < threshold) {
        //                     return colorList[1];
        //                 }
        //             },
        //         },
        //     }
      },
      {
        name: '职工数',
        type: 'line',

        yAxisIndex: '1',//使用第二个y轴
        data: [1500, 1700, 1750, 1800, 1850, 1900, 1910, 1941, 1980, 2000, 2100, 2200]
      },
      // {
      //     name:'平均工资',
      //     type:'line',

      //     yAxisIndex:'2',//使用第三个y轴
      //     data:[3500,3600,4200,4800,5500,6500,4900,3500,5400,5500,6500,7000]
      // }
    ]
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
      <h1>Y轴分开</h1>
      <div
        ref={chartRef}
        className="chart"
      ></div>
      <h1>Y轴聚合</h1>
      <a href="https://codesandbox.io/s/line-gradient-forked-jrk8wf?file=/index.js" target="_blank">点击打开</a>
    </div>
  );
}

export default App;

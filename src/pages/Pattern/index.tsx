import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "./index.less";

function App() {
  const data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];
const dateList = data.map(function (item) {
  return item[0];
});
const valueList = data.map(function (item) {
  return item[1];
});
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
      data: [1,2,3,4,5,6,7]
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
        // axisLabel: {
        //   formatter: '{value}'
        // },
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
        offset: 70,
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
        data: [23, 27, 28, 30, 34, 36, 39],
      },
      {
        name: '职工数',
        type: 'line',

        yAxisIndex: '1',//使用第二个y轴
        data: [1500, 1700, 1750, 1800, 1850, 1900, 191]
      },
      {
          name:'平均工资',
          type:'line',
          yAxisIndex:'2',//使用第三个y轴
          data:[3500,3600,4200,4800,5500,6500,4900]
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

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
  const options = {
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,
        min: 0,
        max: 400
      },
      {
        show: false,
        type: "continuous",
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: dateList.length - 1
      }
    ],
    title: [],
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          // 数据区域缩放。目前只支持直角坐标系的缩放。
          yAxisIndex: "none",
          brushStyle: {
            borderColor: "#D82E73",
            borderWidth: 2,
            borderType: "dashed"
          },
          // 缩放和还原的 icon path
          icon: {}
        },
        // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
        dataView: {
          show: false,
          readOnly: false
        },
        // 动态类型切换
        magicType: { type: ["line", "bar"] },
        // 配置项还原
        restore: {
          // icon: '' // 可以通过 'image://url' 设置为图片，其中 URL 为图片的链接，或者 dataURI
          // 如：path://M8.60776 2.67114H1.39224C1.17581 2.67114 1.05497 2.89965 1.189 3.05565L4.79676 7.23907C4.90003 7.35882 5.09887 7.35882 5.20324 7.23907L8.811 3.05565C8.94503 2.89965 8.82418 2.67114 8.60776 2.67114Z
        },
        // 保存为图片
        saveAsImage: {
          type: "png", // 保存的图片格式
          name: "name", // 保存的文件名称
          excludeComponent: ["toolbox"] // 保存为图片时忽略的组件列表，默认忽略工具栏
        }
      }
    },
    xAxis: [
      {
        data: dateList,
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        offset: 0,
        gridIndex: 0
      },
      {
        data: dateList,
        gridIndex: 1,
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        offset: 1
      },
      {
        data: dateList,
        gridIndex: 2,
        offset: 2
      }
    ],
    yAxis: [
      {
        axisLine: {
          show: true
        }
      },
      {
        gridIndex: 1,
        axisLine: {
          show: true
        }
      },
      {
        gridIndex: 2,
        axisLine: {
          show: true
        }
      }
    ],
    grid: [
      {
        top: "5%",
        height: "30%"
      },
      {
        top: "35%",
        height: "30%"
      },
      {
        top: "65%",
        height: "30%"
      }
    ],
    series: [
      {
        type: "line",
        showSymbol: false,
        data: valueList
      },
      {
        type: "line",
        showSymbol: false,
        data: valueList,
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      {
        type: "line",
        showSymbol: false,
        data: valueList,
        xAxisIndex: 2,
        yAxisIndex: 2
      }
    ],
    dataZoom: [
        {
            type: "inside",
            xAxisIndex: [0, 1, 2]
          },
          {
            type: "inside",
            yAxisIndex: [0, 1, 2]
          },
          {
            type: "inside",
            yAxisIndex: [0, 1, 2]
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
    // window.addEventListener("resize", chart.resize);
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

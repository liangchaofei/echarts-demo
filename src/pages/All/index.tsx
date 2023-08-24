import { useEffect, useRef, useState } from "react";
import { Button, Space } from 'antd';
import * as echarts from "echarts";
import "./index.less";

function App() {
    const [single, setSingle] = useState(false); // 单标尺
    const [double, setDouble] = useState(false); // 双标尺
    const [scale,setScale] = useState(false); // 缩小放大
    const [part, setPart] = useState(false); // 局部放大

    const [play, setPlay] = useState(false); // 播放
    let data = [[1, 116], [2, 129], [3, 135], [4, 86], [5, 73], [6, 85], [7, 73], [8, 68], [9, 92], [10, 130], [11, 245], [12, 139], [13, 115], [14, 111], [15, 309], [16, 206], [17, 137], [18, 128], [19, 85], [20, 94], [21, 71], [22, 106], [23, 84], [24, 93], [25, 85], [26, 73], [27, 83], [28, 125], [29, 107], [30, 82], [31, 44], [32, 72], [33, 106], [34, 107], [35, 66], [36, 91], [37, 92], [38, 113], [39, 107], [40, 131], [41, 111], [42, 64], [43, 69], [44, 88], [45, 77], [46, 83], [47, 111], [48, 57], [49, 55], [50, 60]];
    let newData:any = []; // 在函数顶部定义一个空数组
    const dateList = data.map(function (item) {
      return item[0];
    });

  
  let options = {
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
      // show: true,
      feature: {
        myTool: {
          show: true,
          title: 'a',
          icon: 'path://M85.333333 896h853.333334v42.666667H85.333333z,M85.333333 85.333333h42.666667v853.333334H85.333333zM575.317333 650.325333l-187.946666-177.28-168.064 163.413334-29.781334-30.592 197.376-191.914667 188.757334 178.048 321.152-295.168 28.885333 31.402667z',//可以复制阿里矢量图标的svg代码，path多个值用“，”隔开
                onclick: function () {
                  console.log('aa')
                }

        },
        dataZoom: {

          show: true,
          // 数据区域缩放。目前只支持直角坐标系的缩放。
          // yAxisIndex: "none",
          // brushStyle: {
          //   borderColor: "#D82E73",
          //   borderWidth: 2,
          //   borderType: "dashed"
          // },
          // // 缩放和还原的 icon path
          icon: {
            back: 'as.png'
          }
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
        type: 'value',
        // data: dateList,
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
        type: 'value',
        // data: dateList,
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
        type: 'value',
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
        data: newData
      },
      {
        type: "line",
        showSymbol: false,
        data: newData,
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      {
        type: "line",
        showSymbol: false,
        data: newData,
        xAxisIndex: 2,
        yAxisIndex: 2
      }
    ],
  };

  
  // 缩小放大配置
  const dataZoom = [
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

  // 单标尺配置
  const singleGraphic = {
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
  }

  // 双标尺配置
  const doubleGraphic = {
    elements: [
      {
        type: 'group',
        left: 'center',
        draggable: 'horizontal',
        ondrag: function (params) {
          var pointInPixel = [params.offsetX, params.offsetY];
          var pointInGrid = chart.convertFromPixel('grid', pointInPixel);
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
  };
  const chartRef = useRef<HTMLDivElement>(null);
  let chart: echarts.ECharts | null = null;
  
  useEffect(() => {
    if (!chart) {
      chart = echarts.init(chartRef.current as HTMLDivElement);
    }

    const updatedOptions =  {
      ...options,
      dataZoom: scale ? dataZoom: [],
      graphic: single ? singleGraphic : double ? doubleGraphic:  undefined,
      toolbox: {
        feature: {
          brush: part ? 'rect': 'clear'
          // dataZoom: {
          //   show: part
          // }
        }
      }
    }

    console.log('updatedOptions', updatedOptions)

    chart.setOption(updatedOptions,true);
 
  }, [scale, single, double, part]);





// 在 useEffect 中使用 setInterval 模拟动态添加数据
useEffect(() => {
  if (!chart) {
    chart = echarts.init(chartRef.current as HTMLDivElement);
  }
  if(play){
    console.log('aa')
    const interval =   setInterval(() => {
      if (newData.length >= data.length) {
        clearInterval(interval);
        setPlay(false)
        return;
      }
      console.log('ww')
      newData.push(data[newData.length]);
      console.log('newData', newData,chart)
      chart?.setOption({
        series: [
          {
            type: "line",
            showSymbol: false,
            data: newData
          },
          {
            type: "line",
            showSymbol: false,
            data: newData,
            xAxisIndex: 1,
            yAxisIndex: 1
          },
          {
            type: "line",
            showSymbol: false,
            data: newData,
            xAxisIndex: 2,
            yAxisIndex: 2
          }
        ]
      });
    }, 1000); // 每秒添加一个数据点
  
    return () => {
      clearInterval(interval);
    };
  }
 
}, [play]);


  // 点击单标尺
  const handleClickSingle = () => {
    const newSelectedState = !single;
    setSingle(newSelectedState)
    setDouble(false)
  }

  // 点击双标尺
  const handleClickDouble = () => {
    const newSelectedState = !double;
    setDouble(newSelectedState)
    setSingle(false)
  }

  // 点击 缩小放大
  const handleClickScale = () => {
    const newSelectedState = !scale;
    setScale(newSelectedState)
  }

  // 局部放大
  const handleClickPart = () => {
    const newSelectedState = !part;
    setPart(newSelectedState)
  }

  // 曲线播放
  const handleClickPlay = () => {
    const newSelectedState = !play;
    setPlay(newSelectedState)
  }
  return (
    <div className="App">
      <h1>React Echarts Demo</h1>
      <Space>
        <Button type={play ? 'primary': 'default'} onClick={handleClickPlay}>曲线播放</Button>
        <Button type={single ? 'primary': 'default'} onClick={handleClickSingle}>单标尺</Button>
        <Button type={double ? 'primary': 'default'} onClick={handleClickDouble}>双标尺</Button>
        <Button type={scale ? 'primary': 'default'} onClick={handleClickScale}>缩小放大</Button>
        <Button type={part ? 'primary': 'default'} onClick={handleClickPart}>局部放大</Button>
        <Button>Y轴聚合</Button>
        <Button>Y轴分开</Button>
      </Space>
      <div
        ref={chartRef}
        className="chart"
      ></div>
    </div>
  );
}

export default App;

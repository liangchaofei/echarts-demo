import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const PCAPlot = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const pcaData = [];
    let labels = [];
    const numPointsPerGroup = 500; // 每个区间内的数据点数量
    const numGroups = 3; // 区间数量

    for (let j = 0; j < numGroups; j++) {
      const startX = j; // 区间起始点

      for (let i = 0; i < numPointsPerGroup; i++) {
        const x = startX + Math.random(); // 生成在当前区间内的随机 x 值
        const y = Math.random(); // 生成0到1之间的随机数
        pcaData.push([x, y]);
        labels.push(j); // 将区间作为标签
      }
    }

    const option = {
      title: {
        text: 'PCA主成分分析散点图',
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        axisPointer: {
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1,
          },
        },
      },
      xAxis: {
        name: 'PC1',
        type: 'value',
        axisLine: {
          show: true, // 显示轴线
        },
        axisTick: {
          show: true, // 显示刻度
        },
        splitLine: {
          show: true, // 显示网格线
        },
      },
      yAxis: {
        name: 'PC2',
        type: 'value',
        axisLine: {
          show: true, // 显示轴线
        },
        axisTick: {
          show: true, // 显示刻度
        },
        splitLine: {
          show: true, // 显示网格线
        },
      },
      visualMap: {
        min: 0,
        max: 5,
        dimension: 2,
        orient: 'vertical',
        right: 10,
        top: 'center',
        text: ['高', '低'], // 高低标签
        calculable: true, // 可拖拽以调整值
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026',
          ],
        },
        textStyle: {
          color: '#000', // 文本颜色
        },
        itemHeight: 300, // 设置颜色条的高度
        itemWidth: 20, // 设置颜色条的宽度
        precision: 0, // 设置刻度的精度
        splitNumber: 6, // 设置刻度的数量
      },
      series: [
        {
          name: 'Cluster',
          type: 'scatter',
          data: pcaData.map((point, index) => [...point, labels[index]]),
          itemStyle: {
            opacity: 0.8,
          },
        },
      ],
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ height: '600px', width: '100%' }} />;
};

export default PCAPlot;

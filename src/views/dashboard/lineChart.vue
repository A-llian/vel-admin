<template>
  <div ref="chartRef" id="chart" style="width: 100%; height: 350px;" />
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { lineChartData } from './data'

const chartRef = ref<HTMLDivElement | null>(null);

let chart: echarts.ECharts | null = null

const init = () => {

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false,
      axisTick: {
        show: false
      }
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    },
    yAxis: {
      axisTick: {
        show: false
      }
    },
    legend: {
      data: ['expected', 'actual']
    },
    series: [{
      name: 'expected', itemStyle: {
        color: '#FF005A',
        lineStyle: {
          color: '#FF005A',
          width: 2
        }
      },
      smooth: true,
      type: 'line',
      data: lineChartData.expectedData,
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    },
    {
      name: 'actual',
      smooth: true,
      type: 'line',
      itemStyle: {
        color: '#3888fa',
        lineStyle: {
          color: '#3888fa',
          width: 2
        },
        areaStyle: {
          color: '#f3f8ff'
        }
      },
      data: lineChartData.actualData,
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }]
  }

  chart = echarts.init(chartRef.value as HTMLElement)
  chart.setOption(option, true)
}

const resizeFn = () => {
  chart && chart.resize()
}

onMounted(() => {
  init()
  window.addEventListener('resize', resizeFn)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeFn)
})

</script>
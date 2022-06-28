export interface GrowCardItem {
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
}

export interface LineChartType {
  expectedData: number[];
  actualData: number[];
}

export const growCardList: GrowCardItem[] = [
  {
    title: '访问数',
    value: 2000,
    total: 120000,
    color: 'success',
    action: '月',
  },
  {
    title: '成交额',
    value: 20000,
    total: 500000,
    color: 'info',
    action: '月',
  },
  {
    title: '下载数',
    value: 8000,
    total: 120000,
    color: 'warning',
    action: '周',
  },
  {
    title: '成交数',
    value: 5000,
    total: 50000,
    color: 'danger',
    action: '年',
  },
];

export const lineChartData: LineChartType = {
  expectedData: [130, 140, 141, 142, 145, 150, 160],
  actualData: [120, 82, 91, 154, 162, 140, 130]
}
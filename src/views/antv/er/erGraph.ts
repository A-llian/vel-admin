import { Graph, Node, Cell, Edge } from '@antv/x6'
import '@antv/x6-vue-shape'
import erCard from './card.vue'

Graph.registerVueComponent('er-card', {
  template: `<er-card />`,
  components: {
    erCard
  }
}, true)

Graph.registerEdge('custom-edge', {
  attrs: {
    line: {
      stroke: '#7c68fc' // 指定 path 元素的填充色
    }
  },
  router: {
    name: 'er',
    args: { offset: 'center' }
  }
})

export default class ErGraph {
  public static graph: Graph
  public static nodes = [
    {
      id: '1',
      shape: 'vue-shape',
      size: {
        width: 240,
        height: 134
      },
      position: { x: 0, y: 0 },
      component: 'er-card',
      data: {
        title: 'a1',
        list: [
          { id: 11, label: 'aaa1' },
          { id: 12, label: 'aaa2' },
          { id: 13, label: 'aaa3' }
        ]
      }
    },
    {
      id: '2',
      shape: 'vue-shape',
      size: {
        width: 240,
        height: 134
      },
      position: { x: 500, y: 100 },
      component: 'er-card',
      data: {
        title: 'b1',
        list: [
          { id: 21, label: 'bbb1' },
          { id: 22, label: 'bbb2' },
          { id: 23, label: 'bbb3' }
        ]
      }
    },
    {
      id: '3',
      shape: 'vue-shape',
      size: {
        width: 240,
        height: 134
      },
      position: { x: 500, y: 300 },
      component: 'er-card',
      data: {
        title: 'c1',
        list: [
          { id: 31, label: 'ccc1' },
          { id: 32, label: 'ccc2' },
          { id: 33, label: 'ccc3' }
        ]
      }
    },
    {
      id: '4',
      shape: 'custom-edge',
      source: 1,
      target: 2
    },
    {
      id: '5',
      shape: 'custom-edge',
      source: 1,
      target: 3
    }
  ]

  public static init(H: number) {
    const GRAPH_DOM = document.getElementById('er-container') as HTMLElement
    this.graph = new Graph({
      container: GRAPH_DOM,
      height: H,
      grid: true,
      panning: {
        enabled: true // 开启画布拖拽
      },
      connecting: {
        anchor: 'center',
        connector: 'rounded'
      },
      mousewheel: {
        enabled: true, // 开启滚轮缩放
        modifiers: ['ctrl'] // 设置键盘按键进行滚轮缩放
      }
    })
    const cells: Cell[] = []
    this.nodes.forEach((item: Edge.Metadata | Node.Metadata) => {
      if (item.shape === 'custom-edge') {
        cells.push(this.graph.createEdge(item))
      } else {
        cells.push(this.graph.createNode(item))
      }
    })
    this.graph.resetCells(cells)
    this.graph.centerContent()

    this.graph.on('node:change:data', ({ node }) => {
      console.log(node)
      this.nodes.forEach(item => {
        if (!item.data) return
        if (item.id === node.id) {
          item.data.list = node.data.list
        }
      })
    })
  }
}
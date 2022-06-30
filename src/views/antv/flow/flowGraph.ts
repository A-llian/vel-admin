import { Graph, Shape, Addon, Node } from '@antv/x6'
import '@antv/x6-vue-shape'
import card from './card.vue'
import { NODE_NAME, NODE_HEIGHT, SIZE, PORTS, PORT_HIGHLIGHTING, EDGE_ATTRS } from './node_config'

Graph.registerVueComponent(NODE_NAME, {
  template: `<${NODE_NAME} />`,
  components: {
    card
  }
}, true)

export default class FlowGraph {
  public static graph: Graph
  public static stencil: Addon.Stencil
  public static nodes: Node.Metadata = [
    {
      id: 1,
      shape: 'vue-shape',
      size: SIZE,
      component: NODE_NAME,
      ports: PORTS,
      label: 'sss',
      data: { title: '节点1' }
    },
    {
      id: 2,
      shape: 'vue-shape',
      size: SIZE,
      component: NODE_NAME,
      ports: PORTS,
      data: { title: '节点2' }
    }
  ]

  public static init() {
    const GRAPH_DOM = document.getElementById('graph-container') as HTMLElement
    this.graph = new Graph({
      container: GRAPH_DOM,
      grid: true,
      panning: {
        enabled: true // 开启画布拖拽
      },
      connecting: {
        router: {
          name: 'manhattan',
          args: { padding: 10 }
        },
        connector: 'rounded', // 设置连接线为圆角
        connectionPoint: 'anchor',
        allowBlank: false, // 是否允许连接到画布空白位置的点
        allowMulti: false, // 是否允许在相同的起始节点和终止之间创建多条边
        createEdge() {
          return new Shape.Edge(EDGE_ATTRS)
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        }
      },
      highlighting: PORT_HIGHLIGHTING
    })
    this.initStencil()
    this.initEvent()
  }

  private static initStencil() {
    this.stencil = new Addon.Stencil({
      title: '算子',
      target: this.graph,
      stencilGraphWidth: 200,
      collapsable: false,
      groups: [
        {
          title: '基础流程图',
          name: 'group1',
          graphHeight: this.graphHeight(),
          graphPadding: 2,
          layoutOptions: {
            rowHeight: NODE_HEIGHT + 10
          }
        }
      ],
      layoutOptions: {
        columns: 2
      }
    })
    const STENCIL_DOM = document.getElementById('stencil-container') as HTMLElement
    STENCIL_DOM.appendChild(this.stencil.container)
    const cells: (Node.Metadata | Node<Node.Properties>)[] = []
    this.nodes.forEach((item: Node.Metadata) => cells.push(this.graph.createNode(item)))
    this.stencil.load(cells, 'group1')
  }

  private static initEvent() {
    const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    }
    this.graph.on('node:mouseenter', () => {
      const container = document.getElementById('graph-container') as HTMLElement
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
      showPorts(ports, true)
    })
    this.graph.on('node:mouseleave', () => {
      const container = document.getElementById('graph-container') as HTMLElement
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
      showPorts(ports, false)
    })
  }
  
  private static graphHeight() {
    let height = 0
    const padding = 20
    const len: number = this.nodes.length / 2
    height = len % 1 === 0 ? len * (NODE_HEIGHT + padding) : Number(len.toFixed(0)) * (NODE_HEIGHT + padding)
    return height
  }
}
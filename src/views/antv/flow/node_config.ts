// 节点注册的名称
const NODE_NAME = 'card'

// 节点高度
const NODE_HEIGHT = 65

// 节点宽度
const NODE_WIDTH = 65
const SIZE = { width: NODE_WIDTH, height: NODE_HEIGHT }

// 连接桩配置--(样式)
const PORT_ATTRS = {
  circle: {
    r: 7,
    magnet: true,
    stroke: '#5F95FF',
    strokeWidth: 1,
    fill: '#fff',
    style: {
      visibility: 'hidden'
    }
  }
}

// // 连接桩高亮
const PORT_HIGHLIGHTING = {
  magnetAdsorbed: {
    name: 'stroke',
    args: {
      attrs: {
        fill: '#5F95FF',
        stroke: '#5F95FF'
      }
    }
  }
}

// 连接桩(top, right, bottom, left)四个边连接点
const PORTS = {
  groups: {
    top: {
      position: 'top',
      attrs: PORT_ATTRS
    },
    right: {
      position: 'right',
      attrs: PORT_ATTRS
    },
    bottom: {
      position: 'bottom',
      attrs: PORT_ATTRS
    },
    left: {
      position: 'left',
      attrs: PORT_ATTRS
    }
  },
  items: [
    { group: 'top' },
    { group: 'right' },
    { group: 'bottom' },
    { group: 'left' }
  ]
}

// 连接线配置--(样式)
const EDGE_ATTRS = {
  attrs: {
    line: {
      stroke: '#A2B1C3',
      strokeWidth: 2
    }
  },
  zIndex: 0
}

export {
  NODE_NAME,
  NODE_HEIGHT,
  NODE_WIDTH,
  SIZE,
  PORTS,
  PORT_HIGHLIGHTING,
  EDGE_ATTRS
}

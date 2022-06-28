import {
  User,
  Lock,
  Edit,
  EditPen,
  Check,
  SwitchButton,
  Avatar,
  Search,
  Refresh,
  RefreshRight,
  VideoPlay,
  Grid,
  Delete,
  Plus,
  ArrowRight,
  ArrowLeft,
  CaretTop,
  Expand,
  Fold,
  Close
} from '@element-plus/icons-vue'

const components = [
  // 以下是icon图标
  User,
  Lock,
  Edit,
  EditPen,
  Check,
  SwitchButton,
  Avatar,
  Search,
  Refresh,
  VideoPlay,
  RefreshRight,
  Grid,
  Delete,
  Plus,
  ArrowLeft,
  ArrowRight,
  CaretTop,
  Expand,
  Fold,
  Close
]

import { App as Application } from 'vue'
export default function(app: Application) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}
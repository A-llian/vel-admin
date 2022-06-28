import { CSSProperties, computed, onMounted, onUnmounted, ref } from 'vue'
import { debounce } from '@/utils'

const mainHeight = () => {
  const HTML = ref()

  const main_height = ref('0px')

  const getContentStyle = computed(():CSSProperties => {

    return {
      minHeight: main_height.value,
      height: main_height.value
    }
  })

  const H = computed((): number => {

    const numH = Number(main_height.value.slice(0, -2))

    return numH - 40
  })

  const DOMFun = () => {
    HTML.value = document.querySelector('.el-main')
    main_height.value = window.getComputedStyle(HTML.value).height

    
  }
  const handler = debounce(DOMFun, 200)
  onMounted(() => {
    DOMFun()
    window.addEventListener('resize', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handler)
  })

  return {
    getContentStyle,
    H
  }
}

export default mainHeight

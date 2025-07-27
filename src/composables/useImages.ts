import { ref } from 'vue'

interface ImageItem {
  id: number
  url: string
  name: string
  path: string
}

export function useImages(target: string) {
  const images = ref<ImageItem[]>([])
  const loading = ref(true)

  // 立即加载图片，不依赖 onMounted
  const loadImages = async () => {
    try {
      let modules: Record<string, { default: string }> = {}
      // 同时导入多种类型
      if (target === 'PhotosView') {
        const jpgModules = import.meta.glob('@/assets/images/photos2/*.jpg', { eager: true })
        const pngModules = import.meta.glob('@/assets/images/photos2/*.png', { eager: true })
        modules = { ...jpgModules, ...pngModules } as Record<string, { default: string }>
      } else if (target === 'essayCard') {
        const jpgModules = import.meta.glob('@/assets/images/cardsBgc/*.jpg', { eager: true })
        const pngModules = import.meta.glob('@/assets/images/cardsBgc/*.png', { eager: true })
        modules = { ...jpgModules, ...pngModules } as Record<string, { default: string }>
      }
      images.value = Object.entries(modules).map(([path, module], index) => ({
        id: index + 1,
        url: module.default,
        name:
          path
            .split('/')
            .pop()
            ?.replace(/\.\w+$/, '') || `image-${index}`,
        path,
      }))
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      loading.value = false
    }
  }

  // 立即执行加载
  loadImages()

  return { images, loading, loadImages }
}

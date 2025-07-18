import { ref, onMounted } from 'vue'

interface ImageItem {
  id: number
  url: string
  name: string
  path: string
}

export function useImages(type: 'jpg' | 'png' | 'all' = 'all') {
  const images = ref<ImageItem[]>([])
  const loading = ref(true)

  onMounted(async () => {
    try {
      let modules: Record<string, { default: string }>

      switch (type) {
        case 'jpg':
          modules = import.meta.glob('@/assets/images/photos2/*.jpg', { eager: true })
          break
        case 'png':
          modules = import.meta.glob('@/assets/images/photos2/*.png', { eager: true })
          break
        case 'all':
        default:
          // 同时导入多种类型
          const jpgModules = import.meta.glob('@/assets/images/photos2/*.jpg', { eager: true })
          const pngModules = import.meta.glob('@/assets/images/photos2/*.png', { eager: true })
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
  })

  return { images, loading }
}

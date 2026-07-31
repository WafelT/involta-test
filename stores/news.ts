import type { NewsItem } from '~/shared/types/news'

export const useNewsStore = defineStore('news', () => {
  const items = ref<NewsItem[]>([])
  const updatedAt = ref<string | null>(null)

  function setNews(payload: { items: NewsItem[]; updatedAt: string }) {
    items.value = payload.items
    updatedAt.value = payload.updatedAt
  }

  function clear() {
    items.value = []
    updatedAt.value = null
  }

  return {
    items,
    updatedAt,
    setNews,
    clear,
  }
})

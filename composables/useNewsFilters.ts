import type { NewsItem, NewsSourceId } from '~/shared/types/news'
import { PAGE_SIZE } from '~/shared/types/news'
import { normalizeSearch } from '~/utils/format'

export function useNewsFilters(items: Ref<NewsItem[] | undefined>) {
  const route = useRoute()
  const router = useRouter()

  const source = computed<NewsSourceId | 'all'>(() => {
    const value = route.query.source
    if (value === 'mos' || value === 'lenta') return value
    return 'all'
  })

  const search = computed(() => {
    const value = route.query.q
    return typeof value === 'string' ? value : ''
  })

  const currentPage = computed(() => {
    const raw = Number(route.params.page)
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 1
  })

  const filteredItems = computed(() => {
    const list = items.value ?? []
    const query = normalizeSearch(search.value)

    return list.filter((item) => {
      if (source.value !== 'all' && item.source !== source.value) {
        return false
      }

      if (!query) return true

      const haystack = `${item.title} ${item.description}`.toLowerCase()
      return haystack.includes(query)
    })
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredItems.value.length / PAGE_SIZE)),
  )

  const pageItems = computed(() => {
    const page = Math.min(currentPage.value, totalPages.value)
    const start = (page - 1) * PAGE_SIZE
    return filteredItems.value.slice(start, start + PAGE_SIZE)
  })

  function buildQuery(patch: {
    source?: NewsSourceId | 'all' | null
    q?: string | null
  }) {
    const nextQuery: Record<string, string> = {}
    const nextSource = patch.source !== undefined ? patch.source : source.value
    const nextSearch = patch.q !== undefined ? patch.q : search.value

    if (nextSource && nextSource !== 'all') {
      nextQuery.source = nextSource
    }

    if (typeof nextSearch === 'string' && nextSearch.trim()) {
      nextQuery.q = nextSearch.trim()
    }

    return nextQuery
  }

  async function setSource(next: NewsSourceId | 'all') {
    await router.push({
      path: '/1',
      query: buildQuery({ source: next === 'all' ? null : next }),
    })
  }

  async function setSearch(next: string) {
    await router.push({
      path: '/1',
      query: buildQuery({ q: next.trim() || null }),
    })
  }

  /** Сброс всех фильтров и поисковых запросов */
  async function resetFilters() {
    await router.push({ path: '/1', query: {} })
  }

  async function goToPage(page: number) {
    const safePage = Math.min(Math.max(1, page), totalPages.value)
    await router.push({
      path: `/${safePage}`,
      query: buildQuery({}),
    })
  }

  watch([totalPages, currentPage], ([pages, page]) => {
    if (!import.meta.client) return
    if (page > pages) {
      void goToPage(pages)
    }
  })

  return {
    source,
    search,
    currentPage,
    filteredItems,
    totalPages,
    pageItems,
    setSource,
    setSearch,
    resetFilters,
    goToPage,
  }
}

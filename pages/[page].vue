<template>
  <main class="page">
    <div class="page__container">
      <NewsHeader
        :search="search"
        :pending="pending"
        @search="onSearch"
        @refresh="onRefresh"
      />

      <NewsFilters
        :model-value="source"
        :view-mode="viewStore.mode"
        @update:model-value="setSource"
        @update:view-mode="viewStore.setMode"
      />

      <NewsSkeleton
        v-if="pending && !pageItems.length"
        :view-mode="viewStore.mode"
      />

      <div v-else-if="error" class="page__state page__state--error">
        Не удалось загрузить новости. Попробуйте обновить список.
      </div>

      <div v-else-if="!pageItems.length" class="page__state">
        Ничего не найдено.
        <button type="button" class="page__reset-link" @click="onReset">
          Сбросить фильтры
        </button>
      </div>

      <div
        v-else
        class="news"
        :class="viewStore.mode === 'grid' ? 'news--grid' : 'news--list'"
      >
        <NewsCard
          v-for="item in pageItems"
          :key="item.id"
          :item="item"
          :view-mode="viewStore.mode"
        />
      </div>

      <NewsPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :query="paginationQuery"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/shared/types/news'

definePageMeta({
  validate(route) {
    const page = Number(route.params.page)
    return Number.isInteger(page) && page > 0
  },
})

const route = useRoute()
const viewStore = useViewStore()
const newsStore = useNewsStore()

onMounted(() => {
  viewStore.initFromStorage()
})

const {
  data: newsData,
  pending,
  error,
  refresh,
} = await useAsyncData(
  'news',
  () => $fetch<{ items: NewsItem[]; updatedAt: string }>('/api/news'),
  {
    server: true,
    lazy: false,
    // Не дергать API заново при каждом client-переходе по страницам
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
    },
  },
)

watch(
  newsData,
  (value) => {
    if (value) {
      newsStore.setNews(value)
    }
  },
  { immediate: true },
)

// Рендерим из payload useAsyncData — стабильно на SSR и клиенте
const items = computed(() => newsData.value?.items ?? [])

const {
  source,
  search,
  currentPage,
  totalPages,
  pageItems,
  setSource,
  setSearch,
  resetFilters,
} = useNewsFilters(items)

const paginationQuery = computed(() => {
  const query: Record<string, string> = {}
  if (source.value !== 'all') query.source = source.value
  if (search.value) query.q = search.value
  return query
})

const hasActiveFilters = computed(
  () => source.value !== 'all' || Boolean(search.value),
)

async function onSearch(value: string) {
  await setSearch(value)
}

async function onReset() {
  await resetFilters()
}

async function onRefresh() {
  if (hasActiveFilters.value) {
    await resetFilters()
  }
  clearNuxtData('news')
  await refresh()
}

useHead({
  title: computed(() => `Список новостей — страница ${currentPage.value}`),
})
</script>

<style scoped>
.page {
  padding: 32px 20px 48px;
}

.page__container {
  max-width: var(--container-width);
  margin: 0 auto;
}

.page__state {
  padding: 48px 16px;
  text-align: center;
  color: var(--color-text-secondary);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.page__state--error {
  color: #c62828;
}

.page__reset-link {
  display: inline;
  margin-left: 6px;
  color: var(--color-primary);
  text-decoration: underline;
  font-size: inherit;
}

.news {
  display: grid;
  gap: 16px;
}

.news--grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.news--list {
  grid-template-columns: 1fr;
}

@media (max-width: 768px) {
  .page {
    padding: 20px 16px 40px;
  }

  .news--grid {
    grid-template-columns: 1fr;
  }
}
</style>

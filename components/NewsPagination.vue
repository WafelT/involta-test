<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="Пагинация">
    <template v-for="(item, index) in pages" :key="`${item}-${index}`">
      <span v-if="item === 'ellipsis'" class="pagination__ellipsis">...</span>
      <NuxtLink
        v-else
        class="pagination__page"
        :class="{ 'pagination__page--active': item === currentPage }"
        :aria-current="item === currentPage ? 'page' : undefined"
        :to="{ path: `/${item}`, query }"
      >
        {{ item }}
      </NuxtLink>
    </template>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  query?: Record<string, string>
}>()

const pages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const result: Array<number | 'ellipsis'> = []

  if (total <= 7) {
    for (let i = 1; i <= total; i += 1) result.push(i)
    return result
  }

  // Как в макете: 1 2 3 4 ... N
  result.push(1)

  if (current <= 3) {
    result.push(2, 3, 4, 'ellipsis', total)
    return result
  }

  if (current >= total - 2) {
    result.push('ellipsis', total - 3, total - 2, total - 1, total)
    return result
  }

  result.push('ellipsis', current - 1, current, current + 1, 'ellipsis', total)
  return result
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 28px 0 8px;
}

.pagination__page {
  min-width: 20px;
  font-size: 15px;
  color: var(--color-text);
  padding: 2px 4px;
  text-decoration: none;
  transition: color 0.15s ease;
}

.pagination__page--active {
  color: var(--color-primary);
  font-weight: 700;
}

.pagination__page:hover:not(.pagination__page--active) {
  color: var(--color-primary);
  text-decoration: none;
}

.pagination__ellipsis {
  color: var(--color-text);
  font-size: 15px;
  user-select: none;
}
</style>

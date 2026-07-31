<template>
  <div class="filters">
    <nav class="filters__sources" aria-label="Фильтр по источнику">
      <button
        v-for="item in sources"
        :key="item.id"
        type="button"
        class="filters__source"
        :class="{ 'filters__source--active': modelValue === item.id }"
        @click="emit('update:modelValue', item.id)"
      >
        {{ item.label }}
      </button>
    </nav>

    <div class="filters__views" role="group" aria-label="Вид списка">
      <button
        type="button"
        class="filters__view"
        :class="{ 'filters__view--active': viewMode === 'list' }"
        aria-label="Список"
        @click="emit('update:viewMode', 'list')"
      >
        <IconsIconList />
      </button>
      <button
        type="button"
        class="filters__view"
        :class="{ 'filters__view--active': viewMode === 'grid' }"
        aria-label="Плитка"
        @click="emit('update:viewMode', 'grid')"
      >
        <IconsIconGrid />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsSourceId, NewsViewMode } from '~/shared/types/news'

defineProps<{
  modelValue: NewsSourceId | 'all'
  viewMode: NewsViewMode
}>()

const emit = defineEmits<{
  'update:modelValue': [value: NewsSourceId | 'all']
  'update:viewMode': [value: NewsViewMode]
}>()

const sources = [
  { id: 'all' as const, label: 'Все' },
  { id: 'lenta' as const, label: 'Lenta.ru' },
  { id: 'mos' as const, label: 'Mos.ru' },
]
</script>

<style scoped>
.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  min-height: 28px;
}

.filters__sources {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.filters__source {
  font-size: 15px;
  font-weight: 400;
  color: var(--color-primary);
  padding: 0;
  transition: color 0.15s ease;
}

.filters__source--active {
  color: var(--color-text);
  font-weight: 700;
}

.filters__source:hover:not(.filters__source--active) {
  text-decoration: underline;
}

.filters__views {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.filters__view {
  display: inline-flex;
  color: #bdbdbd;
  padding: 2px;
  transition: color 0.15s ease;
}

.filters__view--active,
.filters__view:hover {
  color: var(--color-primary);
}
</style>

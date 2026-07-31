<template>
  <header class="header">
    <div class="header__top">
      <div class="header__title-row">
        <h1 class="header__title">Список новостей</h1>
        <button
          class="header__refresh"
          type="button"
          aria-label="Обновить список новостей"
          title="Обновить список и сбросить фильтры"
          :disabled="pending"
          @click="emit('refresh')"
        >
          <IconsIconRefresh :size="18" />
        </button>
      </div>

      <NewsSearch
        v-model="localSearch"
        class="header__search"
        @submit="emit('search', $event)"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  search: string
  pending?: boolean
}>()

const emit = defineEmits<{
  refresh: []
  search: [value: string]
}>()

const localSearch = ref(props.search)

watch(
  () => props.search,
  (value) => {
    localSearch.value = value
  },
)

let debounceTimer: ReturnType<typeof setTimeout> | undefined

watch(localSearch, (value) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (value !== props.search) {
      emit('search', value)
    }
  }, 400)
})

onBeforeUnmount(() => {
  clearTimeout(debounceTimer)
})
</script>

<style scoped>
.header {
  margin-bottom: 20px;
  min-height: 36px;
}

.header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 36px;
}

.header__title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.header__title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
}

.header__refresh {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  background: var(--color-card);
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.35s ease;
  flex-shrink: 0;
}

.header__refresh:hover:not(:disabled) {
  background: rgba(47, 128, 237, 0.08);
  border-color: var(--color-primary);
}

.header__refresh:disabled {
  opacity: 0.5;
  cursor: wait;
}

.header__refresh:active:not(:disabled) {
  transform: rotate(-90deg);
}

.header__search {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .header__top {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .header__title {
    font-size: 22px;
  }

  .header__search {
    width: 100%;
  }
}
</style>

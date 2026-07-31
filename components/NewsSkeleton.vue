<template>
  <div class="skeleton" :class="[`skeleton--${viewMode}`]" aria-hidden="true">
    <div
      v-for="index in count"
      :key="index"
      class="skeleton__card"
    >
      <div v-if="viewMode === 'list'" class="skeleton__media" />
      <div class="skeleton__body">
        <div class="skeleton__line skeleton__line--title" />
        <div class="skeleton__line skeleton__line--title-short" />
        <div class="skeleton__line" />
        <div class="skeleton__line skeleton__line--short" />
        <div class="skeleton__meta">
          <div class="skeleton__chip" />
          <div class="skeleton__chip" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsViewMode } from '~/shared/types/news'
import { PAGE_SIZE } from '~/shared/types/news'

withDefaults(
  defineProps<{
    viewMode?: NewsViewMode
    count?: number
  }>(),
  {
    viewMode: 'grid',
    count: PAGE_SIZE,
  },
)
</script>

<style scoped>
.skeleton {
  display: grid;
  gap: 16px;
}

.skeleton--grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.skeleton--list {
  grid-template-columns: 1fr;
}

.skeleton__card {
  display: flex;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  min-height: 140px;
}

.skeleton--grid .skeleton__card {
  flex-direction: column;
  min-height: 220px;
  padding: 20px 22px 16px;
}

.skeleton--list .skeleton__card {
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  min-height: 162px;
  padding: 16px;
}

.skeleton__media {
  flex-shrink: 0;
  width: 200px;
  height: 130px;
  background: #e0e0e0;
}

.skeleton__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  padding: 16px 20px;
}

.skeleton--grid .skeleton__body {
  padding: 0;
}

.skeleton__line {
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}

.skeleton__line--title {
  height: 18px;
  width: 92%;
}

.skeleton__line--title-short {
  height: 18px;
  width: 70%;
}

.skeleton__line--short {
  width: 55%;
}

.skeleton__meta {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 12px;
}

.skeleton__chip {
  width: 88px;
  height: 12px;
  border-radius: 4px;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

@media (max-width: 768px) {
  .skeleton--grid {
    grid-template-columns: 1fr;
  }

  .skeleton--list .skeleton__card {
    flex-direction: column;
  }

  .skeleton__media {
    width: 100%;
    height: 180px;
  }
}
</style>

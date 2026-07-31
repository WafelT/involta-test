<template>
  <article class="card" :class="[`card--${viewMode}`]">
    <NewsCardMedia
      v-if="viewMode === 'list'"
      :src="item.image"
      :alt="item.title"
      :href="item.link"
    />

    <div class="card__body">
      <h2 class="card__title">
        <a :href="item.link" target="_blank" rel="noopener noreferrer">
          {{ item.title }}
        </a>
      </h2>

      <p class="card__description">
        {{ item.description || '\u00A0' }}
      </p>

      <a
        class="card__more"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Подробнее
      </a>

      <div class="card__meta">
        <span class="card__source">{{ item.sourceHost }}</span>
        <time class="card__date" :datetime="isoDate">{{ formattedDate }}</time>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { NewsItem, NewsViewMode } from '~/shared/types/news'
import { formatNewsDate, toIsoDate } from '~/utils/format'

const props = defineProps<{
  item: NewsItem
  viewMode: NewsViewMode
}>()

const formattedDate = computed(() => formatNewsDate(props.item.pubDate))
const isoDate = computed(() => toIsoDate(props.item.pubDate))
</script>

<style scoped>
.card {
  display: flex;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.card--grid {
  flex-direction: column;
  height: 100%;
  min-height: 220px;
  padding: 20px 22px 16px;
}

.card--list {
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  min-height: 162px;
  padding: 16px;
}

.card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.card--list .card__body {
  padding: 0;
  min-height: 130px;
}

.card__title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 10px;
  /* Резерв под 2 строки — меньше скачков при разной длине заголовка */
  min-height: calc(1.35em * 2);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card--grid .card__title {
  -webkit-line-clamp: 3;
  min-height: calc(1.35em * 3);
}

.card__title a {
  color: var(--color-primary);
  text-decoration: none;
}

.card__title a:hover {
  text-decoration: underline;
}

.card__description {
  font-size: 14px;
  line-height: 1.45;
  color: var(--color-text);
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(1.45em * 2);
}

.card--list .card__description {
  -webkit-line-clamp: 2;
  min-height: calc(1.45em * 2);
}

.card--grid .card__description {
  min-height: calc(1.45em * 3);
}

.card__more {
  display: inline-block;
  font-size: 14px;
  line-height: 1.2;
  color: var(--color-primary);
  text-decoration: underline;
  margin-bottom: 16px;
  width: fit-content;
  min-height: 1.2em;
}

.card--list .card__more {
  display: none;
}

.card__meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  font-size: 12px;
  line-height: 1.2;
  color: var(--color-text-secondary);
  min-height: 1.2em;
}

.card__source,
.card__date {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .card--list {
    flex-direction: column;
    min-height: 0;
  }

  .card--list .card__body {
    padding: 0;
    min-height: 0;
  }

  .card--list .card__more {
    display: inline-block;
  }

  .card--grid {
    min-height: 200px;
    padding: 16px;
  }

  .card__title {
    font-size: 15px;
  }
}
</style>

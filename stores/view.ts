import { defineStore } from 'pinia'
import type { NewsViewMode } from '~/shared/types/news'

const STORAGE_KEY = 'news-view-mode'

export const useViewStore = defineStore('view', () => {
  /** SSR + hydration всегда стартуют с одного значения */
  const mode = ref<NewsViewMode>('grid')
  const ready = ref(false)

  function setMode(next: NewsViewMode) {
    mode.value = next

    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, next)
    }
  }

  /** Вызывать только после mount — иначе hydration mismatch */
  function initFromStorage() {
    if (!import.meta.client || ready.value) return

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'list' || saved === 'grid') {
      mode.value = saved
    }

    ready.value = true
  }

  return {
    mode,
    ready,
    setMode,
    initFromStorage,
  }
})

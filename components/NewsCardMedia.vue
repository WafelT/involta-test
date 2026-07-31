<template>
  <div class="media">
    <a
      :href="href"
      class="media__link"
      target="_blank"
      rel="noopener noreferrer"
      tabindex="-1"
      aria-hidden="true"
    >
      <img
        class="media__img"
        :src="currentSrc"
        :alt="alt"
        width="200"
        height="130"
        decoding="async"
        loading="lazy"
        @error="onError"
      >
    </a>
  </div>
</template>

<script setup lang="ts">
const PLACEHOLDER = '/images/placeholder.svg'

const props = defineProps<{
  src: string | null
  alt: string
  href: string
}>()

const failed = ref(false)

const currentSrc = computed(() => {
  if (failed.value || !props.src) return PLACEHOLDER
  return props.src
})

watch(
  () => props.src,
  () => {
    failed.value = false
  },
)

function onError() {
  failed.value = true
}
</script>

<style scoped>
/* Серый контейнер фиксированного размера — место занято до загрузки картинки */
.media {
  flex-shrink: 0;
  width: 200px;
  height: 130px;
  background-color: #e0e0e0;
  overflow: hidden;
  position: relative;
}

.media__link {
  display: block;
  width: 100%;
  height: 100%;
}

.media__img {
  display: block;
  width: 200px;
  height: 130px;
  max-width: none;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 768px) {
  .media {
    width: 100%;
    height: 180px;
  }

  .media__img {
    width: 100%;
    height: 180px;
  }
}
</style>

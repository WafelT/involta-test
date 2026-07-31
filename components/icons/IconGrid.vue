<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" stroke-width="2" />
    <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" stroke-width="2" />
    <rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" stroke-width="2" />
    <rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" stroke-width="2" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 20 })
</script>

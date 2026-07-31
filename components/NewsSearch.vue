<template>
  <div class="search">
    <input
      class="search__input"
      type="search"
      :value="modelValue"
      placeholder=""
      aria-label="Поиск новостей"
      @input="onInput"
      @keydown.enter.prevent="emit('submit', modelValue)"
    >
    <button
      class="search__button"
      type="button"
      aria-label="Найти"
      @click="emit('submit', modelValue)"
    >
      <IconsIconSearch />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.search {
  position: relative;
  width: 100%;
  max-width: 280px;
}

.search__input {
  width: 100%;
  height: 36px;
  padding: 0 40px 0 14px;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  background: var(--color-card);
  font-size: 14px;
  color: var(--color-text);
  outline: none;
  transition: border-color 0.2s ease;
}

.search__input:focus {
  border-color: var(--color-primary);
}

.search__input::-webkit-search-cancel-button {
  display: none;
}

.search__button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: inline-flex;
  color: #bdbdbd;
  padding: 4px;
}

.search__button:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .search {
    max-width: none;
  }

  .search__input {
    height: 40px;
    border-radius: 8px;
  }
}
</style>

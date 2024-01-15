<script setup>
import { useToggle } from "@vueuse/core";
import { ref, watch } from "vue";

const model = defineModel({ type: Boolean })
const enabled = ref(false);
const toggle = useToggle(enabled);
const toggleClass = ref("");

watch(enabled, (newEnabled) => {
  model.value = newEnabled;
  toggleClass.value = enabled.value ? "translate-x-5" : "translate-x-0";
});
</script>

<template>
  <button
    type="button"
    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-purple transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2"
    role="switch"
    @click="toggle()"
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 !transition duration-200 ease-in-out"
      :class="toggleClass"
    ></span>
  </button>
</template>
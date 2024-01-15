<script setup>
import { computed } from "vue";

const model = defineModel();

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: [Object, String],
    default: "A",
  },
  answer: {
    type: [null, String],
    default: null,
  },
  text: String,
  correct: Boolean,
  color: String,
});

const correct = computed(() => {
  return props.answer == props.value
});

// possible states
// idle
// hover
// active
// correct answer
// picked correct answer
// picked incorrect answer

const pickedCorrectAnswer = computed(() => {
  return model.value == answer
})

</script>

<template>
  <input type="radio" :id="id" :value="value" class="hidden" v-model="model" />
  <label
    :for="id"
    class="border-3 py-4.5 group flex cursor-pointer items-center gap-8 self-stretch rounded-3xl border-pure-white bg-pure-white px-5 shadow"
    :class="{
      'border-purple': model == value,
      'border-green': correct,
    }"
  >
    <div
      class="flex h-14 w-14 items-center justify-center rounded-xl bg-light-grey group-hover:bg-purple/50"
    >
      <span class="text-3xl">{{ icon }}</span>
    </div>
    <div class="text-[28px] font-medium leading-7 text-dark-navy">
      {{ text }}
    </div>
    <div v-if="correct"></div>
    <div v-else-if="!correct"></div>
  </label>
</template>

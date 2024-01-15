<script setup>
import DarkModeSwitch from "./components/DarkModeSwitch.vue";
import Choice from "./components/Choice.vue";
import { onMounted, ref } from "vue";

const data = ref(null);

// import SvgPatternMobile from "@/assets/images/pattern-background-mobile-light.svg";
onMounted(async () => {
  const res = await fetch("./data.json");
  console.log(res);

  if (res.ok) {
    data.value = await res.json();
    console.log(data.value);
  }
});

const pickedAnswer = ref(null);
</script>

<template>
  <div class="h-screen bg-light-grey dark:bg-navy">
    <div class="flex items-center justify-between self-stretch px-6 py-4">
      <div></div>
      <div class="flex items-center gap-2">
        <DarkModeSwitch />
      </div>
    </div>
    <div
      class="flex flex-grow flex-col items-center gap-10 self-stretch px-6 pt-8"
    >
      <div class="flex flex-col items-start gap-4 self-stretch">
        <div class="flex flex-col items-start gap-2">
          <h1
            class="font-rubik text-[40px] font-light leading-10 text-dark-navy"
          >
            Welcome to the
          </h1>
          <h1
            class="font-rubik text-[40px] font-medium leading-10 text-dark-navy"
          >
            Frontend Quiz!
          </h1>
        </div>
        <p
          class="self-stretch font-rubik text-sm italic leading-[21px] text-grey-navy"
        >
          Pick a subject to get started
        </p>
      </div>
      <div class="flex flex-col items-start gap-3 self-stretch">
        <Choice
          :id="index"
          :icon="String.fromCharCode(65 + index)"
          :value="option"
          v-model="pickedAnswer"
          :text="option"
          v-for="(option, index) in data?.quizzes[0].questions[0].options"
        />
      </div>
    </div>
  </div>
</template>

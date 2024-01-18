<script setup>
import { useQuizStore } from "@/stores/quiz";
import { ref } from "vue";

const props = defineProps({
    quiz: {
        type: Object,
        required: true,
    },
});

const isClicked = ref(false);
const quizStore = useQuizStore();
const emit = defineEmits(["click"]);
const handleButtonClick = () => {
    isClicked.value = true;

    setTimeout(() => {
        emit("click", props.quiz);
        isClicked.value = false;
    }, 300);
};
</script>

<template>
    <button
        @click="handleButtonClick"
        class="group flex cursor-pointer items-center gap-8 self-stretch rounded-3xl border-3 border-pure-white bg-pure-white px-5 py-4.5 shadow dark:border-navy dark:bg-navy"
        :class="{ 'animate-scale': isClicked }"
    >
        <div
            class="flex h-14 w-14 items-center justify-center rounded-xl"
            :style="{
                backgroundColor: quizStore.BG_COLORS[quiz.title],
            }"
        >
            <img :src="quiz.icon" class="h-10 w-10" />
        </div>
        <div
            class="flex-grow text-start text-2.5xl font-medium leading-7 text-dark-navy dark:text-pure-white"
        >
            {{ quiz.title }}
        </div>
    </button>
</template>

<script setup>
import DarkModeSwitch from "@/components/DarkModeSwitch.vue";
import { useQuizStore } from "@/stores/quiz";
import QuizIcon from "./QuizIcon.vue";
import { computed } from 'vue';

const props = defineProps({
    quizzes: {
        type: Array,
        required: true,
    },
})

const quizStore = useQuizStore();

const quiz = computed(() => {
    return quizStore.currentQuizIndex && props.quizzes ? props.quizzes[quizStore.currentQuizIndex] : null
})
</script>

<template>
    <div class="flex w-full items-center justify-between px-6 py-4"
        :class="{
            '!justify-end': quiz == null,
        }">
        <QuizIcon v-if="quiz"
            :title="quiz.title"
            :icon="quiz.icon" />
        <div class="flex items-center gap-2 p-2 md:gap-4">
            <DarkModeSwitch />
        </div>
    </div>
</template>

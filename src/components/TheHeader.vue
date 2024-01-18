<script setup>
import DarkModeSwitch from "@/components/DarkModeSwitch.vue";
import { useQuizStore } from "@/stores/quiz";

const quizStore = useQuizStore();
</script>

<template>
    <div class="flex w-full items-center justify-between px-6 py-4">
        <div class="flex items-center gap-4">
            <template v-if="quizStore.currentQuiz">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/25"
                    :style="{
                        backgroundColor:
                            quizStore.BG_COLORS[quizStore.currentQuiz.title],
                    }"
                >
                    <img :src="quizStore.currentQuiz.icon" class="h-7" />
                </div>
                <h2
                    class="text-lg font-medium text-dark-navy dark:text-pure-white"
                >
                    {{ quizStore.currentQuiz.title }}
                </h2>
            </template>
        </div>
        <div class="flex items-center gap-2 p-2 md:gap-4">
            <DarkModeSwitch />
        </div>
    </div>
</template>

<script setup>
import HomeButton from "@/components/HomeButton.vue";
import { useQuizStore } from "@/stores/quiz";
import { useRouter } from "vue-router";

const router = useRouter();

const quizStore = useQuizStore();

const goToQuiz = (index) => {
    router.push({
        name: 'Quiz',
        params: {id: index}
    })
};
</script>

<template>
    <div class="flex flex-col items-start gap-4 lg:gap-12 self-stretch">
        <div class="flex flex-col items-start gap-2">
            <h1 class="font-rubik text-4.5xl md:text-6xl font-light text-dark-navy dark:text-pure-white">
                Welcome to the
            </h1>
            <h1 class="font-rubik text-4.5xl md:text-6xl font-medium text-dark-navy dark:text-pure-white">
                Frontend Quiz!
            </h1>
        </div>
        <p class="leading self-stretch font-rubik text-sm md:text-xl italic text-grey-navy dark:text-light-bluish">
            Pick a subject to get started
        </p>
    </div>
    <div class="flex flex-col items-start gap-3 md:gap-6 self-stretch basis-1/2">
        <HomeButton :quiz="quiz" @click="() => goToQuiz(index)"
            v-for="(quiz, index) in quizStore.quizzes" />
    </div>
</template>

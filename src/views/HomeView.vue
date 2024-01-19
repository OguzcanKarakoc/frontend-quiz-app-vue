<script setup>
import HomeButton from "@/components/HomeButton.vue";
import { useQuizStore } from "@/stores/quiz";
import { BG_COLORS } from "@/utils/config";
import { useRouter } from "vue-router";

const router = useRouter();
const quizStore = useQuizStore()

const props = defineProps({
    quizzes: Array,
});

const goToQuiz = (index) => {
    quizStore.currentQuiz = props.quizzes[index]
    router.replace({
        name: "Quiz",
        params: { id: index },
    });
};
</script>

<template>
    <div class="flex flex-col items-start gap-4 self-stretch lg:gap-12">
        <div class="flex flex-col items-start gap-2">
            <h1 class="leading-full font-rubik text-4.5xl font-light text-dark-navy dark:text-pure-white md:text-6xl">
                Welcome to the
            </h1>
            <h1 class="leading-full font-rubik text-4.5xl font-medium text-dark-navy dark:text-pure-white md:text-6xl">
                Frontend Quiz!
            </h1>
        </div>
        <p class="leading self-stretch font-rubik text-sm italic leading-[150%] text-grey-navy dark:text-light-bluish md:text-xl">
            Pick a subject to get started
        </p>
    </div>
    <div class="flex basis-1/2 flex-col items-start gap-3 self-stretch md:gap-6 lg:min-w-[50%] lg:max-w-[50%]">
        <HomeButton :icon="quiz.icon"
            :icon-color="BG_COLORS[quiz.title]"
            :text="quiz.title"
            @click="() => goToQuiz(index)"
            v-for="(quiz, index) in quizzes" />
    </div>
</template>

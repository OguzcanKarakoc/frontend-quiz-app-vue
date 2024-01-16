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
    <div class="flex flex-col items-start gap-4 self-stretch">
        <div class="flex flex-col items-start gap-2">
            <h1 class="font-rubik text-[40px] font-light leading-10 text-dark-navy">
                Welcome to the
            </h1>
            <h1 class="font-rubik text-[40px] font-medium leading-10 text-dark-navy">
                Frontend Quiz!
            </h1>
        </div>
        <p class="leading self-stretch font-rubik text-sm italic text-grey-navy">
            Pick a subject to get started
        </p>
    </div>
    <div class="flex flex-col items-start gap-3 self-stretch">
        <HomeButton :quiz="quiz" @click="() => goToQuiz(index)"
            v-for="(quiz, index) in quizStore.quizzes" />
        <!-- <Choice :id="index"
            :icon="quiz.icon"
            :value="index"
            :text="quiz.title"
            v-model="pickedQuiz"
            v-for="(quiz, index) in quizStore.quizzes">
            <template #icon>
                <div class="flex h-14 w-14 items-center justify-center rounded-xl"
                    :style="{
                        backgroundColor: quizStore.BG_COLORS[quiz.title],
                    }">
                    <img :src="quiz.icon"
                        class="h-10 w-10" />
                </div>
            </template>
        </Choice> -->
    </div>
</template>

<script setup>
import DarkModeSwitch from "./components/DarkModeSwitch.vue";
import Choice from "./components/Choice.vue";
import { computed, onMounted, ref, defineAsyncComponent } from "vue";
import Quiz from "./components/Quiz.vue";
import {useQuizStore} from '@/stores/quiz'
import TheHeader from "./components/TheHeader.vue";
// const data = ref(null);

const quizStore = useQuizStore()

onMounted(async () => {
    const res = await fetch("./data.json");

    if (!res.ok) throw Error("Failed in retrieving quiz");
    
    const jsonResponse =  await res.json();
    // data.value = jsonResponse;
    quizStore.setQuizzes(jsonResponse)
});


// const quizes = computed(() => {
//     return (
//         data.value?.quizzes.map((quiz) => {
//             return {
//                 ...quiz,
//                 icon: defineAsyncComponent(
//                     () => import(`${quiz.icon}?component`),
//                 ),
//             };
//         }) ?? []
//     );
// });

// const currentQuiz = computed(() => {
//     return pickedQuiz.value != null
//         ? data.value?.quizzes[pickedQuiz.value]
//         : null;
// });

console.log();

const pickedAnswer = ref(null);
const pickedQuiz = ref(null);
</script>

<template>
    <div class="h-screen bg-light-grey dark:bg-navy">
        <TheHeader />
        
        <div class="flex flex-grow flex-col items-center gap-10 self-stretch px-6 pt-8">
            <RouterView />
            <template v-if="quizStore.currentQuiz">
                <Quiz :questions="quizStore.currentQuiz.questions" />
            </template>
            <template v-else>
                <div class="flex flex-col items-start gap-4 self-stretch">
                    <div class="flex flex-col items-start gap-2">
                        <h1 class="font-rubik text-[40px] font-light leading-10 text-dark-navy">
                            Welcome to the
                        </h1>
                        <h1 class="font-rubik text-[40px] font-medium leading-10 text-dark-navy">
                            Frontend Quiz!
                        </h1>
                    </div>
                    <p class="self-stretch font-rubik text-sm italic leading-[21px] text-grey-navy">
                        Pick a subject to get started
                    </p>
                </div>
                <div class="flex flex-col items-start gap-3 self-stretch">
                    <Choice :id="index"
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
                                <img :src="quiz.icon" class="h-10 w-10" />
                            </div>
                        </template>
                    </Choice>
                </div>
            </template>
        </div>
    </div>
</template>

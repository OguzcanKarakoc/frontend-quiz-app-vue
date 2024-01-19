<script setup>
import { computed, watchEffect, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProgressBar from "@/components/ProgressBar.vue";
import SvgError from "@/assets/images/icon-error.svg";
import QuizButton from "@/components/QuizButton.vue";
import SvgCorrect from "@/assets/images/icon-correct.svg";
import SvgIncorrect from "@/assets/images/icon-incorrect.svg";
import { useQuizStore } from "@/stores/quiz";
import QuizIcon from "@/components/QuizIcon.vue";

const quizStore = useQuizStore();
const route = useRoute();
const router = useRouter();

const props = defineProps({
    quizzes: Array,
    id: String,
});

watchEffect(() => {
    quizStore.currentQuizIndex = route.params?.id;
});

const quiz = computed(() => {
    return props.quizzes[route.params?.id];
});

const questionIndex = ref(0);

const progress = computed(() => {
    return (100 / quiz.value.questions.length) * questionIndex.value;
});

const result = ref(0);

const reset = () => {
    selectedAnswer.value = null;
    submittedAnswer.value = null;
};

const selectedAnswer = ref(null);
const submittedAnswer = ref(null);

const question = computed(() => {
    return quiz.value.questions[questionIndex.value];
});

const answer = computed(() => {
    return question.value.answer;
});

const questionCounterText = computed(() => {
    return `Question ${questionIndex.value + 1} of ${quiz.value.questions.length}`;
});

const error = ref(null);

const onSubmit = () => {
    if (!selectedAnswer.value) {
        error.value = "Please select an answer";
        return;
    }
    submittedAnswer.value = selectedAnswer.value;
    if (submittedAnswer.value == answer.value) {
        result.value++;
    }
};

watchEffect(() => {
    if (error.value && selectedAnswer.value) error.value = null;
});

const nextQuestion = () => {
    reset();
    questionIndex.value++;
};

const restart = () => {
    quizStore.currentQuizIndex = null;
    router.replace({
        name: "Home",
    });
};
</script>

<template>
    <template v-if="question">
        <div class="flex flex-col items-center gap-6 md:gap-10 self-stretch lg:min-h-[452px] lg:max-w-[50%] lg:self-auto lg:justify-between">
            <div class="flex flex-col items-start gap-3 md:gap-7  self-stretch">
                <p class="text-sm italic leading-full md:text-xl text-grey-navy dark:text-light-bluish">
                    {{ questionCounterText }}
                </p>
                <h2 class="text-xl md:text-4xl font-medium leading-full text-dark-navy dark:text-pure-white">
                    {{ question.question }}
                </h2>
            </div>
            <ProgressBar :progress="progress" />
        </div>
        <div class="flex flex-col items-center gap-3 self-stretch lg:min-w-[50%] lg:max-w-[50%]">
            <QuizButton :text="option"
                :index="index"
                :icon-color-class="{
                    'bg-purple text-pure-white': selectedAnswer == option,
                    'bg-light-grey': selectedAnswer != option,
                    'bg-red':
                        submittedAnswer &&
                        submittedAnswer == option &&
                        answer != option,
                    '!bg-green':
                        submittedAnswer &&
                        selectedAnswer == option &&
                        answer == option,
                }"
                :selected="selectedAnswer == option"
                :class="{
                    'cursor-default': submittedAnswer,
                    'border-purple dark:border-purple':
                        selectedAnswer == option,
                    '!border-green':
                        submittedAnswer &&
                        selectedAnswer == option &&
                        answer == option,
                    '!border-red':
                        submittedAnswer &&
                        submittedAnswer == option &&
                        answer != option,
                }"
                @click="!submittedAnswer ? (selectedAnswer = option) : null"
                v-for="(option, index) in question.options">
                <div class="h-8 w-8">
                    <SvgCorrect class="h-8 w-8"
                        v-show="submittedAnswer && answer == option" />
                    <SvgIncorrect class="h-8 w-8"
                        v-show="submittedAnswer &&
                            submittedAnswer == option &&
                            answer != option
                            " />
                </div>
            </QuizButton>
            <button @click="onSubmit"
                class="button"
                v-if="!submittedAnswer">
                Submit Answer
            </button>
            <button class="button"
                v-else
                @click="nextQuestion">
                Next question
            </button>

            <div class="flex items-center gap-2"
                v-if="error">
                <SvgError class="h-8 w-8" />
                <p class="text-lg text-red">{{ error }}</p>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="flex flex-col items-start gap-4 self-stretch lg:gap-12">
            <div class="flex flex-col items-start gap-2">
                <h1 class="font-rubik text-4.5xl font-light leading-full text-dark-navy dark:text-pure-white md:text-6xl">
                    Quiz completed
                </h1>
                <h1 class="font-rubik text-4.5xl font-medium leading-full text-dark-navy dark:text-pure-white md:text-6xl">
                    You scored...
                </h1>
            </div>
        </div>
        <div class="flex basis-1/2 flex-col items-start gap-3 self-stretch md:gap-6">
            <div
                class="flex flex-col items-center gap-4 self-stretch rounded-2xl bg-pure-white p-8 shadow dark:bg-navy md:gap-12 md:p-12">
                <QuizIcon :icon="quiz.icon"
                    :title="quiz.title" />
                <div class="flex flex-col items-center gap-4 self-stretch">
                    <span
                        class="text-[88px] font-medium leading-full text-dark-navy dark:text-pure-white md:text-[144px]">{{
                            result }}</span>
                    <span class="text-lg leading-full text-grey-navy dark:text-light-bluish md:text-2xl">out of {{
                        quiz.questions.length }}</span>
                </div>
            </div>
            <button @click="restart"
                class="button"
                v-if="!submittedAnswer">
                Play Again
            </button>
        </div>
    </template>
</template>

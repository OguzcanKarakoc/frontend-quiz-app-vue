<script setup>
import { ref, onMounted, computed } from "vue";
import Question from "./Question.vue";
import Choice from "./Choice.vue";
import SvgError from "@/assets/images/icon-error.svg";

const props = defineProps({
    questions: {
        type: Array,
        default: [],
    },
});

const emit = defineEmits(["finished"]);

onMounted(() => {
    currentQuestionIndex.value = 0;
});

/**
 *         :id="index"
                        :icon="String.fromCharCode(65 + index)"
                        :value="option"
                        v-model="pickedAnswer"
                        :text="option"
 */
const paginate = () => {
    if (currentQuestionIndex.value < props.questions.length - 1) {
        // next question
        selectedAnswer.value = null;
        currentQuestionIndex.value++;
    } else {
        emit("finished", score);
    }
};

const score = computed(() => {});

const currentQuestion = computed(() => {
    return props.questions[currentQuestionIndex.value];
});

const questionCounterText = computed(() => {
    return `Question ${currentQuestionIndex.value + 1} of ${props.questions.length}`;
});

const answer = computed(() => {
    return currentQuestion.value?.answer == selectedAnswer.value;
});

const currentQuestionIndex = ref(0);
const quizFinished = ref(false);
const result = ref([]);
const selectedAnswer = ref(0);
const errors = ref([]);
const correct = ref(null)
const handleSubmit = () => {
    // reset errors
    errors.value = [];
    if (!selectedAnswer.value) {
        errors.value.push("Please select an answer");
        return;
    }
    if (selectedAnswer.value == currentQuestion.value?.answer) {
        correct.value = true
    } else {
        correct.value = false
    }
};

const nextQuestion = () => {
    paginate();
}
</script>

<template>
    <div class="flex flex-col items-center gap-6 self-stretch">
        <div class="flex flex-col items-start gap-3 self-stretch">
            <p class="text-sm italic leading-5 text-grey-navy">
                {{ questionCounterText }}
            </p>
            <h2 class="text-xl font-medium leading-6 text-dark-navy">
                {{ currentQuestion.question }}
            </h2>
        </div>
        <div
            class="flex h-4 flex-col items-start justify-center gap-2 self-stretch rounded-full bg-pure-white p-1"
        >
            <div class="h-2 w-40 shrink-0 rounded-full bg-purple"></div>
        </div>
    </div>
    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col items-center gap-3 self-stretch"
    >
    <!-- selected answer -->
        <Choice
            :id="index"
            :icon="String.fromCharCode(65 + index)"
            :value="option"
            :text="option"
            :correct="correct"
            v-model="selectedAnswer"
            v-for="(option, index) in currentQuestion.options"
        />
        <button type="submit" class="button">Submit Answer</button>

        <!-- errors -->
        <template v-if="errors.length">
            <div class="flex items-center gap-8" v-for="error in errors">
                <SvgError class="w-8 h-8"/>
                <p class="text-lg text-red">{{ error }}</p>
            </div>
        </template>
    </form>
</template>

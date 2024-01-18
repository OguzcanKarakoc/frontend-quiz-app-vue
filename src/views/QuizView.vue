<script setup>
import { computed, watchEffect, ref } from "vue";
import { useQuizStore } from "@/stores/quiz";
import { useRoute } from "vue-router";
import ProgressBar from "@/components/ProgressBar.vue";
import { useForm } from "vee-validate";
import SvgError from "@/assets/images/icon-error.svg";
import RadioButton from "@/components/RadioButton.vue";
import * as yup from "yup";

const route = useRoute();
const quizStore = useQuizStore();

watchEffect(() => {
    console.log("watcheffect called");
    quizStore.setCurrentQuiz(route.params?.id);
});

const questions = computed(() => {
    return quizStore.currentQuiz?.questions ?? [];
});

const currentQuestionIndex = ref(0);

const currentQuestion = computed(() => {
    return questions.value[currentQuestionIndex.value];
});

const answer = computed(() => {
    return currentQuestion.value.answer;
});

const questionCounterText = computed(() => {
    console.log(questions.value.length);
    return `Question ${currentQuestionIndex.value + 1} of ${questions.value.length}`;
});

const schema = yup.object({
    option: yup.string().required("Please select an answer"),
});

const { values, errors, defineField, handleSubmit } = useForm({
    validationSchema: schema,
});
const [selectedOption, selectedOptionAttrs] = defineField("option");

const isCorrect = computed(() => {
    return selectedOption.value == answer.value;
});

const isSubmitted = ref(false)

const onSubmit = handleSubmit((values) => {
    isSubmitted.value = true;
});

const nextQuestion = () => {
    isSubmitted.value = false;
    selectedOption.value = null;
    currentQuestionIndex.value++;
};

const progress = computed(() => {
    return (100 / questions.value.length * currentQuestionIndex.value);
});

/**
 * 
 * @param {Determines the button state} option 
 */
const buttonState = (option) => {
    if (!isSubmitted.value) return null;
    console.log('button');

    // form was submited
    if (isCorrect.value) {
        if (answer.value == option) return "correct";
        return null;
    }

    if (answer.value == option) return "review";
    if (selectedOption.value == option) return "incorrect";

    return null;
};
</script>

<template>
    <div
        v-if="currentQuestion"
        class="flex flex-col items-center gap-6 self-stretch"
    >
        <div class="flex flex-col items-start gap-3 self-stretch">
            <p
                class="text-sm italic leading-5 text-grey-navy dark:text-light-bluish"
            >
                {{ questionCounterText }}
            </p>
            <h2
                class="text-xl font-medium leading-6 text-dark-navy dark:text-pure-white"
            >
                {{ currentQuestion.question }} {{  progress }}
            </h2>
        </div>
        <ProgressBar :progress="progress" />
    </div>
    <form
        v-if="currentQuestion"
        @submit.prevent="onSubmit"
        class="flex flex-col items-center gap-3 self-stretch"
    >
        <RadioButton
            :id="index"
            :icon="String.fromCharCode(65 + index)"
            :text="option"
            :value="option"
            :state="buttonState(option)"
            v-bind="selectedOptionAttrs"
            v-model="selectedOption"
            :disabled="isSubmitted"
            v-for="(option, index) in currentQuestion.options"
        />
        <button type="submit" class="button" v-show="!isSubmitted">Submit Answer</button>
        <button type="button" class="button" @click="nextQuestion" v-show="isSubmitted">Next question</button>

        <!-- errors -->
        <template v-if="errors">
            <div class="flex items-center gap-2" v-for="error in errors">
                <SvgError class="h-8 w-8" />
                <p class="text-lg text-red">{{ error }}</p>
            </div>
        </template>
    </form>
</template>

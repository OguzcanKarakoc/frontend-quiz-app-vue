<script setup>
import { computed, watchEffect, ref } from "vue";
import { useQuizStore } from "@/stores/quiz";
import { useRoute } from "vue-router";
import ProgressBar from "@/components/ProgressBar.vue";
import { useForm } from "vee-validate";
import Choice from "@/components/Choice.vue";

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

const questionCounterText = computed(() => {
    console.log(questions.value.length);
    return `Question ${currentQuestionIndex.value + 1} of ${questions.value.length}`;
});

const { values, defineField, handleSubmit } = useForm();
const [question, questionAttrs] = defineField("question");

const onSubmit = handleSubmit(
    (values) => {
        // good
        alert(JSON.stringify(values, null, 2));
    },
    (errors) => {
        alert(JSON.stringify(errors, null, 2));
        // bad
    },
);

const nextQuestion = () => {

}
</script>

<template>
    <div
        v-if="currentQuestion"
        class="flex flex-col items-center gap-6 self-stretch"
    >
        <div class="flex flex-col items-start gap-3 self-stretch">
            <p class="text-sm italic leading-5 text-grey-navy">
                {{ questionCounterText }}
            </p>
            <h2 class="text-xl font-medium leading-6 text-dark-navy">
                {{ currentQuestion.question }}
            </h2>
        </div>
        <ProgressBar :progress="10" />
    </div>
    <form
        v-if="currentQuestion"
        @submit.prevent="onSubmit"
        class="flex flex-col items-center gap-3 self-stretch"
    >
        <Choice
            :id="index"
            :icon="String.fromCharCode(65 + index)"
            :value="option"
            :text="option"
            v-model="question"
            v-for="(option, index) in currentQuestion.options"
        />
        <button type="submit" class="button">Submit Answer</button>

        <!-- errors -->
        <!-- <template v-if="errors.length">
            <div class="flex items-center gap-8" v-for="error in errors">
                <SvgError class="w-8 h-8"/>
                <p class="text-lg text-red">{{ error }}</p>
            </div>
        </template> -->
    </form>
</template>

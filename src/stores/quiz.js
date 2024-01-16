import { defineStore } from "pinia";
import { computed, defineAsyncComponent, ref, watch } from "vue";

export const useQuizStore = defineStore("quiz", () => {
    let quizzes = ref(null);
    let currentQuizIndex = ref(null);
    const backgroundColor = ref(null);

    const BG_COLORS = Object.freeze({
        HTML: "#FFF1E9",
        CSS: "#E0FDEF",
        JavaScript: "#EBF0FF",
        Accessibility: "#F6E7FF",
    });

    function setQuizzes(data) {
        quizzes.value = data.quizzes;
        // quizzes.value = data.quizzes.map((quiz) => ({
        //     ...quiz,
        //     icon: defineAsyncComponent(() => import(`${quiz.icon}?component`)),
        // }));
    }

    const currentQuiz = computed(() => {
        return quizzes.value ? quizzes.value[currentQuizIndex.value] : null;
    });

    watch(currentQuiz, () => {
        if (!currentQuiz.value) return;

        backgroundColor.value = BG_COLORS[currentQuiz.value.title];
    });

    function setCurrentQuiz(index) {
        currentQuizIndex.value = index;
    }

    return {
        quizzes,
        currentQuiz,
        setCurrentQuiz,
        setQuizzes,
        backgroundColor,
        BG_COLORS,
    };
});

import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"

export const useQuizStore = defineStore("quiz", () => {
    const currentQuizIndex = useLocalStorage('quizIndex', null);

    function reset() {
        currentQuizIndex.value = null
    }

    return {
        currentQuizIndex,
        reset,
    };
});

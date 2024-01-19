import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"

export const useQuizStore = defineStore("quiz", () => {
    const currentQuizIndex = useLocalStorage('quizIndex', null);

    return {
        currentQuizIndex,
    };
});

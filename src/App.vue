<script setup>
import { onMounted } from "vue";
import { useQuizStore } from "@/stores/quiz";
import TheHeader from "./components/TheHeader.vue";

const quizStore = useQuizStore();

onMounted(async () => {
    const res = await fetch("./data.json");

    if (!res.ok) throw Error("Failed in retrieving quiz");

    const jsonResponse = await res.json();
    quizStore.setQuizzes(jsonResponse);
});
</script>

<template>
    <div
        class="flex h-screen flex-col items-center justify-center self-stretch bg-light-grey bg-pattern-mobile-light bg-cover bg-no-repeat dark:bg-dark-navy dark:bg-pattern-mobile-dark md:bg-pattern-tablet-light dark:md:bg-pattern-tablet-dark lg:bg-pattern-desktop-light dark:lg:bg-pattern-desktop-dark"
    >
        <TheHeader class="relative z-10 max-w-screen-xl" />
        <main
            class="relative z-10 flex w-full max-w-screen-xl flex-grow flex-col items-center gap-10 px-6 pt-8 md:gap-16 lg:flex-row lg:items-start lg:justify-between"
        >
            <RouterView />
        </main>
    </div>
</template>

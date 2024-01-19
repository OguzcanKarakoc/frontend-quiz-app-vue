import { createRouter, createMemoryHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import QuizView from "@/views/QuizView.vue";
import { useQuizStore } from "@/stores/quiz";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
        props: true,
    },
    {
        path: "/quiz/:id",
        name: "Quiz",
        component: QuizView,
        props: true,
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import QuizView from "@/views/QuizView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/quiz/:id",
        name: "Quiz",
        component: QuizView,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

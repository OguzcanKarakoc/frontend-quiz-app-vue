<script setup>
import { ref } from "vue";
import IconContainer from "./IconContainer.vue";

const props = defineProps({
    icon: String,
    iconColor: String,
    text: String,
});

const isClicked = ref(false);
const emit = defineEmits(["click"]);
const handleButtonClick = () => {
    isClicked.value = true;

    setTimeout(() => {
        isClicked.value = false;
        emit("click", props.quiz);
    }, 300);
};
</script>

<template>
    <button @click="handleButtonClick"
        class="group flex cursor-pointer items-center gap-4 self-stretch rounded-2xl border-3 border-pure-white bg-pure-white p-3 shadow dark:border-navy dark:bg-navy md:gap-8 lg:px-5 lg:py-4.5"
        :class="{ 'animate-scale': isClicked }">
        <IconContainer :icon="icon"
            :color="iconColor" />
        <div
            class="flex-grow text-start text-lg font-medium leading-full text-dark-navy dark:text-pure-white md:text-2.5xl">
            {{ text }}
        </div>
    </button>
</template>

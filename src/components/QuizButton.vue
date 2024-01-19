<script setup>
import { ref } from "vue";
import IconContainer from "./IconContainer.vue";

const props = defineProps({
    index: {
        type: Number,
        default: 0,
    },
    iconColorClass: {
        type: [Object, String],
        default: 'bg-light-grey'
    },
    text: String,
});
</script>

<template>
    <button @click="$emit('click', $event)"
        class="group flex cursor-pointer items-center gap-4 self-stretch rounded-2xl border-3 border-pure-white bg-pure-white p-3 shadow dark:border-navy dark:bg-navy md:gap-8 lg:px-5 lg:py-4.5">
        <IconContainer :text="String.fromCharCode(65 + index)" :colorClass="iconColorClass" />
        <div class="flex-grow text-start text-lg font-medium leading-full text-dark-navy dark:text-pure-white md:text-2.5xl">
            {{ text }}
        </div>
        <slot></slot>
    </button>
</template>

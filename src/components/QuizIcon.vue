<script setup>
import { BG_COLORS } from '@/utils/config';
import IconContainer from './IconContainer.vue';

defineProps({
    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
})
</script>


<template>
    <div class="flex items-center gap-4">
        <IconContainer :icon="icon" :color="BG_COLORS[title]" />
        <p class="text-lg font-medium leading-full text-dark-navy dark:text-pure-white md:text-2.5xl">
            {{ title }}
        </p>
    </div>
</template>

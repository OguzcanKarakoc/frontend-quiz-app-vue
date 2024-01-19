<script setup>
const props = defineProps({
    color: String,
    colorClass: [Object, String],
    icon: String,
    text: String,
    label: String,
});
</script>

<template>
    <div class="flex h-10 w-10 min-w-10 items-center justify-center rounded-xl text-center text-lg font-medium text-grey-navy md:h-14 md:w-14 md:min-w-14"
        :class="colorClass"
        :style="color && { backgroundColor: color }">
        <img v-if="icon"
            :src="icon"
            class="h-7 w-7 md:h-10 md:w-10" />
        <span v-else-if="text">{{ text }}</span>
    </div>
</template>

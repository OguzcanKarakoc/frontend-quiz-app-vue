<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
    progress: Number, // percentage
});

const bar = ref(undefined);

const updateProgres = () => {
    if (!props.progress || !bar.value) return;
    bar.value.style.width = `${props.progress}%`;
};

onMounted(() => {
    updateProgres();
});

watch(
    () => props.progress,
    () => {
        updateProgres();
    },
);
</script>

<template>
    <div
        class="flex h-4 flex-col items-start justify-center gap-2 self-stretch rounded-full bg-pure-white p-1 dark:bg-navy"
    >
        <div ref="bar" class="h-2 shrink-0 rounded-full bg-purple"></div>
    </div>
</template>

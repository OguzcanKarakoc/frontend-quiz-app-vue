<script setup>
import { computed } from "vue";
import SvgCorrect from "@/assets/images/icon-correct.svg";
import SvgIncorrect from "@/assets/images/icon-incorrect.svg";

const model = defineModel();

const props = defineProps({
    id: {
        type: [String, Number],
        required: true,
    },
    value: {
        type: [String, Number],
        required: true,
    },
    icon: {
        type: [Object, String],
        default: "A",
    },
    answer: {
        type: [null, String],
        default: null,
    },
    text: String,
    correct: {
        type: [Boolean, null],
        default: null,
    },
    color: String,
});

// possible states
// idle
// hover
// active
// correct answer
// picked correct answer
// picked incorrect answer

const pickedCorrectAnswer = computed(() => {
    return model.value == answer;
});

defineOptions({
    inheritAttrs: false,
});

// console.log(props.correct);
</script>

<template>
    <input
        v-bind="$attrs"
        type="radio"
        :id="id"
        :value="value"
        class="hidden"
        v-model="model"
    />
    <label
        :for="id"
        class="group flex items-center gap-8 self-stretch rounded-3xl border-3 bg-pure-white px-5 py-4.5 shadow"
        :class="{
            'border-purple': model == value,
            'cursor-pointer border-pure-white': correct == null,
            'border-green': correct,
            'border-red': correct == false,
        }"
    >
        <slot name="icon">
            <div
                class="flex h-14 w-14 items-center justify-center rounded-xl bg-light-grey"
                :class="{
                    'group-hover:bg-purple/10': correct == null,
                    'bg-green': correct,
                    'bg-red': correct == false,
                }"
            >
                <span
                    class="text-center text-3xl font-medium text-grey-navy"
                    :class="{
                        'group-hover:text-purple': correct == null,
                        'text-pure-white': correct != null,
                    }"
                    >{{ icon }}</span
                >
            </div>
        </slot>
        <div class="flex-grow text-[28px] font-medium leading-7 text-dark-navy">
            {{ text }}
        </div>
        <SvgCorrect class="h-8 w-8" v-if="correct" />
        <SvgIncorrect class="h-8 w-8" v-else-if="correct == false" />
    </label>
</template>

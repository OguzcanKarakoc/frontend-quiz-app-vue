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
    text: String,
    state: {
        type: String,
        validator(value, props) {
            return ["correct", "incorrect", "review"].includes(value);
        },
    },
});

defineOptions({
    inheritAttrs: false,
});

const isAnswerGiven = computed(() => props.state != null);
const isAnswerCorrect = computed(() => props.state == "correct");
const isAnswerWrong = computed(() => props.state == "incorrect");
const isOptionSelected = computed(() => model.value == props.value);
const isOptionReview = computed(() => props.state == "review");
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
        class="group flex items-center gap-4 self-stretch rounded-3xl border-3 bg-pure-white p-3 shadow"
        :class="{
            'border-purple': isOptionSelected && !isAnswerGiven,
            'cursor-pointer border-pure-white': !isAnswerGiven,
            '!border-pure-white': isOptionReview,
            '!border-green': isAnswerCorrect,
            '!border-red': isAnswerWrong,
        }"
    >
        <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-light-grey"
            :class="{
                'bg-purple': isOptionSelected && !isAnswerGiven,
                'group-hover:bg-purple/10': !isAnswerGiven && !isOptionSelected,
                '!bg-green': isAnswerCorrect,
                '!bg-red': isAnswerWrong,
            }"
        >
            <span
                class="text-center text-lg font-medium text-grey-navy"
                :class="{
                    'group-hover:text-purple':
                        !isAnswerGiven && !isOptionSelected,
                    'text-pure-white':
                        (isAnswerGiven && !isOptionReview) || isOptionSelected,
                }"
                >{{ icon }}</span
            >
        </div>
        <div class="flex-grow text-lg font-medium text-dark-navy">
            {{ text }}
        </div>
        <SvgCorrect class="h-8 w-8" v-if="isAnswerCorrect || isOptionReview" />
        <SvgIncorrect class="h-8 w-8" v-else-if="isAnswerWrong" />
    </label>
</template>

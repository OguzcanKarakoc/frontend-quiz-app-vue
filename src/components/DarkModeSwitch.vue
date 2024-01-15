<script setup>
import { useDark } from "@vueuse/core";
import Switch from "./Switch.vue";
import SvgSunDark from "@/assets/images/icon-sun-dark.svg";
import SvgMoonDark from "@/assets/images/icon-moon-dark.svg";
import SvgSunLight from "@/assets/images/icon-sun-light.svg";
import SvgMoonLight from "@/assets/images/icon-moon-light.svg";

let isDark = useDark();

</script>

<template>
  <SvgSunLight class="h-4 w-4" v-if="isDark" />
  <SvgSunDark class="h-4 w-4" v-else />
  <Switch v-model="isDark" />
  <SvgMoonLight class="h-4 w-4" v-if="isDark" />
  <SvgMoonDark class="h-4 w-4" v-else />
</template>

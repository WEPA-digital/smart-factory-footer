<script setup lang="ts">
import type { Icon } from "@/types/Icon";
import type { UIButtonColor } from "@/types/ui/UIButtonColor";
import type { UIButtonSize } from "@/types/ui/UIButtonSize";
import { computed, useSlots } from "vue";
import UIIcon from "./UIIcon.vue";

export interface IUIButton {
  text?: string;
  title?: string;
  icon?: Icon;
  iconSize?: number;
  size?: UIButtonSize;
  color?: UIButtonColor;
  iconPosition?: "left" | "right";
  disabled?: boolean;
}

const props = withDefaults(defineProps<IUIButton>(), {
  text: "",
  title: "",
  icon: undefined,
  iconSize: undefined,
  size: "md",
  color: "blue-deep",
  iconPosition: "left",
  disabled: false,
});

const slots = useSlots();

const colorStyles = computed(() => {
  return {
    "blue-deep":
      "bg-blue-deep-100 hover:bg-blue-medium-100  active:bg-black  disabled:bg-blue-deep-20",
    "blue-light":
      "bg-blue-light-100 hover:bg-[#91DFED] active:bg-blue-light-100 disabled:bg-blue-light-20",
    outline:
      "bg-white border border-blue-deep-100 hover:border-blue-medium-100 active:border-blue-medium-100 active:bg-blue-medium-10 disabled:border-blue-deep-30 disabled:bg-white",
    white: "bg-white text-blue-deep-100 active:bg-blue-medium-20 disabled:bg-white",
  };
});

const textStyles = computed(() => {
  return {
    "blue-deep": "uppercase text-white",
    "blue-light": "uppercase text-blue-deep-100 disabled:text-blue-deep-50",
    outline:
      "text-blue-deep-100 hover:text-blue-medium-100 active:text-blue-medium-100 disabled:text-blue-deep-30",
    white:
      "text-blue-deep-100 hover:text-blue-medium-100 active:text-blue-medium-100 disabled:text-blue-deep-30",
  };
});

const sizeStyles = computed(() => {
  if (props.text !== "") {
    // Button with Text
    return {
      xs: "px-2 py-0.5",
      sm: "px-3 py-1.5",
      md: "px-4 py-2.5",
    };
  } else {
    // Button with only Icon
    return {
      xs: "p-[1px]",
      sm: "p-1",
      md: "p-2",
    };
  }
});

const iconSizes = computed(() => {
  if (props.text !== "") {
    // Button with Text
    return {
      xs: 18,
      sm: 19,
      md: 20,
    };
  } else {
    // Button with only Icon
    return {
      xs: 20,
      sm: 24,
      md: 24,
    };
  }
});

const outlinePaddings = computed(() => {
  if (props.text !== "") {
    // Button with Text
    return {
      xs: "py-[calc(0.125rem-1px)]",
      sm: "py-[calc(0.375rem-1px)]",
      md: "py-[calc(0.625rem-1px)]",
    };
  } else {
    // Button with only Icon
    return {
      xs: "py-[calc(0.125rem-1px)]",
      sm: "py-[calc(0.25rem-1px)]",
      md: "py-[calc(0.5rem-1px)]",
    };
  }
});
</script>

<template>
  <button
    class="flex h-max w-max select-none items-center rounded font-nexa-text text-sm font-bold tracking-wide drop-shadow-button disabled:cursor-not-allowed"
    :class="`${sizeStyles[size]} ${colorStyles[color]} ${textStyles[color]} ${
      color === 'outline' ? outlinePaddings[size] : ''
    }`"
    :disabled="disabled"
    :title="title"
  >
    <!-- ICON -->
    <slot
      v-if="iconPosition === 'left'"
      name="icon-left"
    >
      <UIIcon
        v-if="icon"
        :size="iconSize ?? iconSizes[size]"
        :icon="icon"
      />
    </slot>

    <!-- TEXT -->
    <span
      v-if="slots.default || text"
      :class="{ 'pl-2 pr-1': icon }"
      >{{ text }}
      <slot> </slot>
    </span>

    <!-- ICON -->
    <slot
      v-if="iconPosition === 'right'"
      name="icon-right"
    >
      <UIIcon
        v-if="icon"
        :size="iconSize ?? iconSizes[size]"
        :icon="icon"
        class="pl-1"
      />
    </slot>
  </button>
</template>

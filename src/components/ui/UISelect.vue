<script lang="ts" setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import UIIcon from "./UIIcon.vue";
import type { UISelectItem } from "@/types/ui/UISelectItem";
import { useVModel } from "@/composables/vModel";

export interface IUISelect {
  modelValue?: UISelectItem<any>;
  disabled?: boolean;
  placeholder?: string;
  items: UISelectItem<any>[];
  native?: boolean;
  selectClass?: string;
}

const props = withDefaults(defineProps<IUISelect>(), {
  modelValue: undefined,
  disabled: false,
  placeholder: undefined,
  native: true,
  selectClass: "",
});

const emit = defineEmits(["update:modelValue"]);
const selected = useVModel<UISelectItem<any>>(props, emit);
</script>

<template>
  <div
    v-if="native"
    class="relative flex w-max items-center"
  >
    <select
      v-model="selected"
      :disabled="disabled"
      class="w-full cursor-pointer rounded border-2 border-blue-medium-50 bg-white py-1.5 pl-2 pr-7 text-blue-deep-100 hover:border-blue-medium-50 hover:bg-blue-medium-10 focus:border-blue-higlight focus:bg-white focus:outline-none focus:ring-0"
      :class="selectClass"
      style="background-image: none"
    >
      <option
        v-if="placeholder"
        :value="undefined"
        disabled
      >
        {{ placeholder }}
      </option>
      <option
        v-for="item in props.items"
        :key="item.id"
        :value="item"
      >
        {{ item.text }}
      </option>
    </select>
    <UIIcon
      icon="ChevronDown"
      :size="24"
      class="pointer-events-none absolute right-1 text-blue-deep-100"
    />
  </div>

  <Listbox
    v-else
    v-model="selected"
    :disabled="disabled"
  >
    <div class="relative">
      <!-- Render children directly instead of a `button` -->
      <ListboxButton as="template">
        <div
          class="relative flex w-full cursor-pointer content-between items-center rounded border border-grey-light-100 bg-white p-2 text-sm text-blue-deep-100 drop-shadow-button"
          :class="{ 'opacity-50 hover:cursor-not-allowed': disabled }"
        >
          <span class="mb-[2px] block truncate">
            {{ selected?.text ?? placeholder ?? $t("uiSelect.placeholder") }}
          </span>
          <UIIcon
            icon="ChevronDown"
            :size="20"
            class="ml-auto pl-2 text-blue-deep-100"
          />
        </div>
      </ListboxButton>

      <ListboxOptions class="absolute mt-1 w-full rounded-md border border-grey-light-100 bg-white">
        <ListboxOption
          v-for="item in props.items"
          :key="item.id"
          :value="item"
          class="block w-full border-b-2 p-2 last:border-b-0 hover:cursor-pointer hover:font-extrabold"
        >
          <slot
            name="option"
            v-bind="item"
          >
            {{ item.text }}
          </slot>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

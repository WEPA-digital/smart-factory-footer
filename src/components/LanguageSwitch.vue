<script setup lang="ts">
import UISelect from "./ui/UISelect.vue";
import type { UISelectItem } from "@/types/ui/UISelectItem";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();

const selectItems = computed<Array<UISelectItem<string>>>(() =>
  i18n.availableLocales.map(locale => ({
    id: locale,
    text: locale,
    value: locale,
  }))
);

const supportedLocales = ["en", "de"];
let initialLocale =
  window.localStorage.getItem("wepa_locale") ??
  navigator.language.split("-")[0] ??
  i18n.locale.value;
if (supportedLocales.indexOf(initialLocale) == -1) {
  initialLocale = "en";
}


i18n.locale.value = initialLocale;
const selected = selectItems.value.find(item => item.id === initialLocale);

function onSelect(item: UISelectItem<string>) {
  i18n.locale.value = item.id;
  window.localStorage.setItem("wepa_locale", item.id);
}
</script>

<template>
  <UISelect
    v-model="selected"
    :items="selectItems"
    select-class="!border-0"
    @update:model-value="onSelect"
  >
  </UISelect>
</template>

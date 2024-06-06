<script setup lang="ts">
import WindowClose from "vue-material-design-icons/WindowClose.vue";
import AlertOutline from "vue-material-design-icons/AlertOutline.vue";
import InformationOutline from "vue-material-design-icons/InformationOutline.vue";
import Cached from "vue-material-design-icons/Cached.vue";
import BarcodeScan from "vue-material-design-icons/BarcodeScan.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ChevronUp from "vue-material-design-icons/ChevronUp.vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import Loading from "vue-material-design-icons/Loading.vue";
import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline.vue";
import EmoticonHappyOutline from "vue-material-design-icons/EmoticonHappyOutline.vue";
import Magnify from "vue-material-design-icons/Magnify.vue";
import Filter from "vue-material-design-icons/Filter.vue";
import Download from "vue-material-design-icons/Download.vue";
import FilterRemove from "vue-material-design-icons/FilterRemove.vue";
import CheckboxBlankCircle from "vue-material-design-icons/CheckboxBlankCircle.vue";
import AccountCircle from "vue-material-design-icons/AccountCircle.vue";
import Logout from "vue-material-design-icons/Logout.vue";
import MenuUp from "vue-material-design-icons/MenuUp.vue";
import MenuDown from "vue-material-design-icons/MenuDown.vue";
import MessageReply from "vue-material-design-icons/MessageReply.vue";
import ContentSave from "vue-material-design-icons/ContentSave.vue";
import FormatBold from "vue-material-design-icons/FormatBold.vue";
import FormatItalic from "vue-material-design-icons/FormatItalic.vue";
import FormatUnderline from "vue-material-design-icons/FormatUnderline.vue";
import FormatListBulleted from "vue-material-design-icons/FormatListBulleted.vue";
import FormatListNumbered from "vue-material-design-icons/FormatListNumbered.vue";
import Image from "vue-material-design-icons/Image.vue";
import FormatSuperscript from "vue-material-design-icons/FormatSuperscript.vue";
import Paperclip from "vue-material-design-icons/Paperclip.vue";

import type { Icon } from "@/types/Icon";

export interface IUIIcon {
  icon: Icon;
  size?: number;
}

withDefaults(defineProps<IUIIcon>(), {
  size: 18,
});

const icons = {
  WindowClose: WindowClose,
  AlertOutline: AlertOutline,
  InformationOutline: InformationOutline,
  Cached: Cached,
  BarcodeScan: BarcodeScan,
  ChevronDown: ChevronDown,
  ChevronUp: ChevronUp,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  Loading: Loading,
  PlusCircleOutline: PlusCircleOutline,
  EmoticonHappyOutline: EmoticonHappyOutline,
  Magnify: Magnify,
  Filter: Filter,
  Download: Download,
  FilterRemove: FilterRemove,
  Logout: Logout,
  AccountCircle: AccountCircle,
  CheckboxBlankCircle: CheckboxBlankCircle,
  MenuUp: MenuUp,
  MenuDown: MenuDown,
  MessageReply: MessageReply,
  ContentSave: ContentSave,
  FormatBold: FormatBold,
  FormatItalic: FormatItalic,
  FormatUnderline: FormatUnderline,
  FormatListBulleted: FormatListBulleted,
  FormatListNumbered: FormatListNumbered,
  Image: Image,
  FormatSuperscript: FormatSuperscript,
  Paperclip: Paperclip,
};

const mirror = ["MessageReply", "Filter"];
</script>

<template>
  <component
    :is="icons[icon]"
    :size="size"
    :class="{ '-scale-x-100': mirror.includes(icon) }"
  />
</template>

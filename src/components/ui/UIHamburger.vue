<script setup lang="ts">
import UITreeNode from "../ui/UITreeNode.vue";
import { nextTick, ref, onBeforeMount } from "vue";
import { set } from "lodash";

export interface IUIHamburger {
  treeData: any;
}

const props = withDefaults(defineProps<IUIHamburger>(), {
  treeData: null,
});

const collapsed = ref(true);

function resetToggleState(data: any) {
  data.forEach(currentData => {
    if (currentData.collapsed) {
      set(currentData, "collapsed", true);
    }
    if (!!currentData.children) {
      currentData.children.forEach(childData => {
        if (childData.collapsed) {
          set(childData, "collapsed", true);
        }
      });
    }
  });
}

function toggleCollapse() {
  if (!collapsed.value) {
    nextTick(() => {
      resetToggleState(treeData.value);
    });
  }
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div class="tree-container">
    <span
      class="hamburger"
      @click="toggleCollapse"
      >{{ collapsed ? "\u2630" : "\u2261" }}</span
    >
    <div
      v-if="!collapsed"
      class="tree-dropdown"
    >
      <u-i-tree-node :data="treeData"></u-i-tree-node>
    </div>
  </div>
</template>

<style scoped>
.hamburger {
  cursor: pointer;
  background-color: white;
  color: #002d55;
  padding: 7px 7px;
  border: none;
  position: relative;
}

.tree-container {
  position: relative;
}

.tree-dropdown {
  position: absolute;
  top: 111%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  z-index: 1000;
}
</style>

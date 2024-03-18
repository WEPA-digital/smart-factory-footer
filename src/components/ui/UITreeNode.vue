<script setup lang="ts">
import { ref, computed } from "vue";
import { useNavigationStore } from "../../../../vue-app/src/stores/navigationStore";
export interface IUITreeNode {
  data?: any;
  isChildren?: boolean;
}

const props = withDefaults(defineProps<IUITreeNode>(), {
  data: [],
  isChildren: false,
});

const collapsed = ref(true);
const navigationStore = useNavigationStore();
function toggleCollapse(item) {
  item.collapsed = !item.collapsed;
}

function getUpdatedUrl(option: any) {
  return (
    option["entity_link"] +
    "?navigationHistory=" +
    JSON.stringify(["landing_page", `${option["plant"]}`, `${option["applicationName"]}`])
  );
}
</script>

<template>
  <ul class="tree-node">
    <li
      v-for="(item, index) in data"
      :key="index"
      class="cursor-pointer"
      @click="toggleCollapse(item)"
    >
      <span
        v-if="!item.isHeader"
        :class="{ collapsed: item.collapsed, 'child-class': props.isChildren }"
        class="hamburger"
      >
        <a
          :href="getUpdatedUrl(item)"
          target="_self"
          ><b>{{ item.name }}</b></a
        >
      </span>
      <span
        v-else
        class="float-left"
      >{{ item.name }}</span>
      <u-i-tree-node
        v-if="!item.collapsed && item.children"
        :data="item.children"
        :is-children="true"
      ></u-i-tree-node>
    </li>
  </ul>
</template>

<style scoped>
.hamburger::before {
  //content: "u\2630";
  cursor: pointer;
}

.collapsed::before {
  //content: "u\2261";
}

.tree-node {
  list-style-type: none;
  background-color: white;
  color: black;
  padding-left: 0;
  padding-bottom: 0;
  font-size: 18px;
  margin-bottom: 0;
}

.tree-node li {
  position: relative;
}

.tree-node .tree-node {
  position: static;
}

.child-class {
  padding-left: 20px;
  font-size: 16px;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>

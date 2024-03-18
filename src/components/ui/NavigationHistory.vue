<script setup lang="ts">
import { useNavigationStore } from "@/stores/navigationStore";
import { config } from "@/models/Config";
import { onBeforeMount, watch } from "vue";

export interface INavigationHistory {
  treeData: any;
}

const props = withDefaults(defineProps<INavigationHistory>(), {
  treeData: null,
});

const navigationStore = useNavigationStore();

const historyUrlMapper = {};
let currentPlant = "";

navigationStore.navigationHistory.forEach((level) => {
  historyUrlMapper[level] = "";
});

function setUpNavigationHistory() {
  navigationStore.navigationHistory.forEach((pathLevel, historyIndex) => {
    if (pathLevel === "landing_page") {
      historyUrlMapper[pathLevel] = config.iotPlatform;
    } else {
      let plantLocations = [
        "Arnsberg",
        "Bridgend",
        "Capannori",
        "Cassino",
        "Chateau",
        "Giershagen",
        "Kriebstein",
        "Leuna",
        "Lille",
        "Mainz",
        "Piechowice",
        "Porcari",
        "Swalmen",
        "Troyes",
      ];
      plantLocations.forEach(plant => {
        if (navigationStore.navigationHistory.includes(plant)) {
          currentPlant = plant;
        }
      });
      if (currentPlant === pathLevel) {
        historyUrlMapper[pathLevel] = "";
      } else {
        for (let i = 0; i < props.treeData.length; i++) {
          if (props.treeData[i].name === currentPlant && props.treeData[i].children) {
            for (let j = 0; j < props.treeData[i].children.length; j++) {
              if (props.treeData[i].children[j].applicationName === pathLevel) {
                if (historyIndex === navigationStore.navigationHistory.length - 1) {
                  historyUrlMapper[pathLevel] =
                    props.treeData[i].children[j].entity_link +
                    "?navigationHistory=" +
                    JSON.stringify(navigationStore.navigationHistory);
                  break;
                } else {
                  const updatedHistory = navigationStore.navigationHistory.slice(0, historyIndex + 1);
                  historyUrlMapper[pathLevel] =
                    props.treeData[i].children[j].entity_link +
                    "?navigationHistory=" +
                    JSON.stringify(updatedHistory);
                  break;
                }
              }
            }
          }
        }
      }
    }
  });
}

onBeforeMount(() => {
  setUpNavigationHistory();
});

watch(
  () => navigationStore.navigationHistory,
  () => {
    setUpNavigationHistory();
  }
);

function getUrlText(item: string) {
  let updatedText = "";
  switch (item) {
    case "landing_page":
      updatedText = "Landing Page";
      break;
    case "pmui":
      updatedText = "PM UI";
      break;
    case "pcui":
      updatedText = "PC UI";
      break;
    default:
      updatedText = item;
  }
  return updatedText;
}
</script>

<template>
  <div class="row">
    <div class="col">
      <span
        v-for="(item, historyIndex) in navigationStore.navigationHistory"
        :key="`navigationHistory-${historyIndex}`"
        class="cursor-pointer"
      >
        <span v-if="navigationStore.navigationHistory.length - 1 === historyIndex">
          <a
            :href="historyUrlMapper[item]"
            target="_self"
            ><b>{{ getUrlText(item) }}</b></a
          >
        </span>
        <span v-else-if="currentPlant !== item">
          <a
            :href="historyUrlMapper[item]"
            target="_self"
            ><b>{{ getUrlText(item) }}</b></a
          > /
        </span>
        <span v-else>
          <b>{{ getUrlText(item) }}</b> /
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
a:hover {
  color: white;
}
</style>

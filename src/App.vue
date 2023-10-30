<script setup lang="ts">
import { config } from "@/models/Config";
import PageHeader from "./components/PageHeader.vue";

document.title = `${config.title} - v${config.version}`;
</script>

<template>
  <div class="relative select-none focus:outline-none">
    <PageHeader />
    <!-- Add New components here to show them on Main Page -->
  </div>
</template>

<style>
:not(button):not(a):focus {
  outline: none;
}
</style>

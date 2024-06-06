<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { config } from "@/models/Config";
</script>
<template>
  <header
    class="flex h-[3rem] content-between items-center border-slate-200 bg-white p-4 shadow-md md:h-[3.75rem] md:px-6 md:py-5"
  >
    <div class="flex-1">
      <img
        src="@/assets/img/logo.svg"
        alt="Wepa Logo"
        class="relative top-0.5 h-[1.25rem] md:h-5"
      />
    </div>

    <h1 class="hidden font-nexa text-2xl font-bold md:block">
      {{ $t("dashboardView.title") }} {{ config.version }}
    </h1>

    <h1 class="font-nexa text-xl font-bold md:hidden">
      {{ $t("dashboardView.titleShort") }} {{ config.version }}
    </h1>

    <div class="flex-1">
      <NavBar />
    </div>
  </header>
</template>

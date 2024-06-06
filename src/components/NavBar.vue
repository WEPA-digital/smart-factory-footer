<script setup lang="ts">
import UIButton from "./ui/UIButton.vue";
import LanguageSwitch from "./LanguageSwitch.vue";
</script>

<template>
  <nav>
    <ul class="flex list-none items-center justify-end gap-x-1">
      <li>
        <LanguageSwitch />
      </li>
      <li class="hidden">
        <router-link to="/">
          <!-- DESKTOP -->
          <UIButton
            color="white"
            :outline="false"
            icon="AccountCircle"
            :icon-size="20"
            class="hidden md:flex"
          >
            <!-- TODO: Replace with user name from logged in user -->
            Max Mustermann
          </UIButton>

          <!-- MOBILE -->
          <UIButton
            color="white"
            :outline="false"
            icon="AccountCircle"
            :icon-size="20"
            class="block md:hidden"
          />
        </router-link>
      </li>
      <li class="hidden border-grey-light-100 md:border-l md:pl-2">
        <router-link to="/logout">
          <UIButton
            icon="Logout"
            color="white"
            :outline="false"
            :icon-size="20"
          />
        </router-link>
      </li>
    </ul>
  </nav>
</template>

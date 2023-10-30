import { createApp, markRaw } from "vue";
import { createI18n, type IntlDateTimeFormats } from "vue-i18n";
import de from "@/locale/de.json";
import en from "@/locale/en.json";
import App from "./App.vue";
import "./index.css";

const i18n = createI18n({
  legacy: false,
  locale: "de",
  allowComposition: true,
  missingWarn: false,
  fallbackWarn: false,
  silentTranslationWarn: true,
  datetimeFormats: {
    de: de.datetimeFormats as unknown as IntlDateTimeFormats,
    en: en.datetimeFormats as unknown as IntlDateTimeFormats,
  },
  messages: {
    de: de,
    en: en,
  },
});
const locale = i18n.global.locale;

const app = createApp(App);
app.use(i18n);

app.mount("#app");

export { i18n, locale };

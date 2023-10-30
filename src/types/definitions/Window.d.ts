import type { Config } from "@/models/Config";

declare global {
  interface Window {
    wepaConfig: Config;
  }
}

// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetIcons,
  presetWebFonts,
  presetAttributify,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Roboto",
        mono: ["Fira Code", "Fira Mono:400,700"],
        lobster: "Lobster",
      },
    }),
  ],
});

import { defineConfig, mergeConfig } from "vitest/config";
import { viteUserConfig } from "./vite.config";

export default mergeConfig(
    viteUserConfig,
    defineConfig({
        test: {
            setupFiles: ["./setupTests.ts"],
            globals: true,
            environment: "jsdom",
            coverage: {
                enabled: true,
                provider: "istanbul", // or 'v8'
            },
        },
    }),
);

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // react-hooks/purity: new React 19 rule that flags Math.random in useMemo.
      // Intentional in animation/Three.js components (Antigravity).
      "react-hooks/purity": "off",
      // react-hooks/set-state-in-effect: flags useEffect(() => setMounted(true), []).
      // This is the only reliable hydration-safety pattern with next-themes.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;

import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node
      },
      ecmaVersion: 2022,
      sourceType: "module"
    },
    rules: {
      "no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }]
    }
  },
  // Configuration for test files
  
  {
    files: ["**/*.test.js", "**/*_tests.js", "**/tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.mocha,
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        jest: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly"
      }
    }
  },
  // Configuration for UI/browser files
  {
    files: ["ui_part/**/*.js", "ui_testing/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        bootstrap: "readonly"
      }
    }
  },
  // Ignore patterns
  {
    ignores: [
      "**/node_modules/**",
      "**/coverage/**",
      "**/lcov-report/**",
      "**/*.min.js",
      "**/mochawesome-report/**",
      "**/playwright-report/**",
      "**/test-results/**",
      "ui_part/public/js/main.js" // Generated/bundled file
    ]
  }
];

module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        "plugin:vue/essential",
        "@vue/standard",
        "@vue/typescript"
    ],

    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        quotes: ["error", "double"],
        indent: ["error", 4],
        semi: ["error", "always"],
        "vue/html-indent": ["error", 4]
    },

    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2020
    },

    overrides: [
        {
            files: [
                "./__tests__/*.{j,t}s?(x)"
            ],
            env: {
                mocha: true
            }
        },
        {
            files: [
                "**/__tests__/**/*.spec.{j,t}s?(x)",
                "**/__tests__/**/*.test.{j,t}s?(x)",
            ],
            env: {
                mocha: true
            }
        }
    ],

    extends: [
        "plugin:vue/essential",
        "@vue/standard",
        "@vue/typescript",
        "@vue/typescript/recommended"
    ]
};

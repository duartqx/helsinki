module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["standard"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": "off",
    "comma-dangle": "off",
    "space-before-function-paren": "off",
    quotes: "off",
    semi: "off",
  },
};

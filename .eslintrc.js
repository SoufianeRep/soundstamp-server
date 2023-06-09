module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: "plugin:@typescript-eslint/recommended",
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
}

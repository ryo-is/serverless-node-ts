module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",

    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "env": { "browser": true, "node": true, "es6": true },
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/typedef": ["error"],
    "prettier/prettier": [
      "error",
      {
        semi: false,
        singleQuote: false
      }
    ]
  }
}

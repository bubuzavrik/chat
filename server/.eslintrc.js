module.exports = {
  "root": true,
  "env": {
    "node": true,
    "es6": true,
    "mongo": true
  },
  "extends": ["standard"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": [
      "warn",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-unused-vars": [
      "warn",
      {
        "varsIgnorePattern": "_config",
        "args": "after-used",
        "vars": "all"
      }
    ],
    "arrow-parens": ["error", "as-needed"],
    "camelcase": "warn",
    "vars-on-top": "warn",
    "no-console": "warn"
  }
}

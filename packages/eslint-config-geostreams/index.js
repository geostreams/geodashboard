module.exports = {
  extends: [
    "plugin:flowtype/recommended",
    "airbnb",
    "prettier",
  ],
  plugins: [
    "flowtype",
    "prettier",
    "react",
  ],
  env: {
    "browser": true,
    "es6": true
  },
  settings: {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "src",
          "node_modules"
        ]
      }
    }
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    },
    "sourceType": "module"
  },
  rules: {
    "brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    "camelcase": "off",
    "comma-dangle": [
      "error",
      "never"
    ],
    "default-case": "off",
    "function-paren-newline": [
      "error",
      "consistent"
    ],
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": "off",
    "indent": [
      "error",
      4,
      {
        "SwitchCase": 1
      }
    ],
    "max-len": [
      "warn",
      {
        "code": 120,
        "tabWidth": 4,
        "ignoreComments": true,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ],
    "no-console": [
      "error",
      {
        "allow": [
          "error",
          "warn"
        ]
      }
    ],
    "no-mixed-operators": [
      "error",
      {
        "allowSamePrecedence": true
      }
    ],
    "no-multi-spaces": [
      "error",
      {
        "ignoreEOLComments": true
      }
    ],
    "no-param-reassign": [
      "error",
      {
        "props": false
      }
    ],
    "no-underscore-dangle": "off",
    "no-unused-expressions": [
      "error",
      {
        "allowShortCircuit": true
      }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "operator-linebreak": [
      "warn",
      "after"
    ],
    "prefer-destructuring": "off",
    "quotes": [
      "error",
      "single",
      {
        "avoidEscape": true
      }
    ],
    "quote-props": [
      "error",
      "consistent-as-needed",
      {
        "keywords": false,
        "unnecessary": true,
        "numbers": false
      }
    ],
    "semi": [
      "error",
      "always"
    ],
    "space-infix-ops": [
      "error",
      {
        "int32Hint": false
      }
    ],
    "react/default-props-match-prop-types": [
      "error",
      {
        "allowRequiredDefaults": true
      }
    ],
    "react/destructuring-assignment": "off",
    "react/jsx-curly-newline": [
      "warn",
      {
        "multiline": "consistent",
        "singleline": "consistent"
      }
    ],
    "react/jsx-indent": "off",
    "react/jsx-indent-props": [
      "error",
      4
    ],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-space-before-closing": [
      "error",
      "always"
    ],
    "react/jsx-wrap-multilines": "off",
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2,
    "react/require-default-props": [
      "error",
      {
        "forbidDefaultForRequired": false
      }
    ],
    "react/static-property-placement": [
      "warn",
      "static public field"
    ],
    'prettier/prettier': [
      'warn',
      {
        "printWidth": 80,
        "trailingComma": "none",
        "tabWidth": 4,
        "semi": true,
        "singleQuote": true
      }
    ]
  }
}
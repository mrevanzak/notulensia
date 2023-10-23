module.exports = {
  globals: {
    NodeJS: true,
  },
  extends: ["custom/next", "plugin:@tanstack/eslint-plugin-query/recommended"],
  rules: {
    "import/no-extraneous-dependencies": ["off"],
    "jsx-a11y/img-redundant-alt": ["off"],
    "jsx-a11y/anchor-is-valid": ["off"],
    "jsx-a11y/click-events-have-key-events": ["off"],
    "jsx-a11y/no-static-element-interactions": ["off"],
    "jsx-a11y/no-noninteractive-element-interactions": ["off"],
    "jsx-a11y/label-has-associated-control": ["off"],
    "eslint-comments/require-description": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/no-shadow": ["off"],
    "@typescript-eslint/no-unsafe-call": ["off"],
    "@typescript-eslint/no-unsafe-assignment": ["off"],
    "@typescript-eslint/no-unnecessary-condition": ["off"],
    "@typescript-eslint/no-non-null-assertion": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-unsafe-member-access": ["off"],
    "@typescript-eslint/no-unsafe-argument": ["off"],
    "@typescript-eslint/unbound-method": ["off"],
    "@typescript-eslint/consistent-type-definitions": ["off"],
    "no-unused-vars": ["off"],
    "no-bitwise": ["off"],
    "no-shadow": "off",
    "import/order": ["off"],
    "react-hooks/exhaustive-deps": ["off"],
    "turbo/no-undeclared-env-vars": ["off"],
    "@next/next/no-img-element": ["off"],
    "@next/next/no-css-tags": ["off"],
    "@next/next/no-document-import-in-page": ["off"],
  },
};

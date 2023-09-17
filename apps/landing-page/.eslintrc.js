module.exports = {
  extends: ["custom/next"],
  rules: {
    "import/no-extraneous-dependencies": ["error", {devDependencies: true}],
    "jsx-a11y/anchor-is-valid": ["off"],
  },
};

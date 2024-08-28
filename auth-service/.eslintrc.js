module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',  
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    // eslint-disable-next-line no-dupe-keys
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    env: {
      node: true,
      es6: true,
    },
    plugins: ['@typescript-eslint'],
    rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-var-requires":"off"
      
    },
  };
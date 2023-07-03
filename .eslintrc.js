module.exports = {
  extends      : ['@privyid/eslint-config-persona'],
  parserOptions: { project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'] },
}

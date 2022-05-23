module.exports = {
  content : [
    "./components/**/*.{vue,md}",
    "./components/.vitepress/theme/**/*.{vue,md}",
  ],
  presets: [
    require('@privyid/tailwind-preset')
  ],
}

const baseConfig = require('@hideoo/prettier-config')

/** @type {import('prettier').Config} */
const customPrettierConfig = {
  ...baseConfig,
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}

module.exports = customPrettierConfig

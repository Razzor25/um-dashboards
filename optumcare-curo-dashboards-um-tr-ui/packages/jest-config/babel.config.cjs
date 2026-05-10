/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    // 'next/babel',
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        modules: 'cjs',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-modules-commonjs', '@babel/plugin-transform-private-methods'],
};

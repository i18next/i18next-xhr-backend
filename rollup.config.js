import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { argv } from 'yargs';

const format = argv.format || argv.f || 'iife';

const babelOptions = {
  exclude: 'node_modules/**',
  presets: [['@babel/env', { modules: false }]],
  babelrc: false
};

const name = 'i18nextXHRBackend'

export default [
  {
    input: './src/index.js',
    output: {
      format,
      name,
      file: `dist/${format}/${name}.js`
    },
    plugins: [
      babel(babelOptions),
      nodeResolve()
    ],
  },
  {
    input: './src/index.js',
    output: {
      format,
      name,
      file: `dist/${format}/${name}.min.js`
    },
    plugins: [
      babel(babelOptions),
      nodeResolve(),
      terser()
    ],
  }
]

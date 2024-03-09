import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'use-smooth-scroll.ts',
  output: {
    file: 'esm/use-smooth-scroll.js',
    format: 'es',
  },
  plugins: [typescript(), nodeResolve(), commonjs(), terser()],
}

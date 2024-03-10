import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

export default {
  input: 'index.ts',
  output: {
    file: 'index.js',
    format: 'es',
  },
  external: ['react', 'next/navigation'],
  plugins: [typescript(), nodeResolve(), commonjs(), terser()],
}

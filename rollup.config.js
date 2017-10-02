import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';

const shared = {
  entry: `compiled/react-persist.js`,
  sourceMap: true,
  external: ['react'],
  globals: {
    react: 'React',
  },
  exports: 'named',
};

export default [
  Object.assign({}, shared, {
    moduleName: 'ReactPersist',
    format: 'umd',
    dest: 'dist/react-persist.umd.js',
    plugins: [
      resolve(),
      commonjs({
        include: /node_modules/,
      }),
      sourceMaps(),
      filesize(),
      uglify(),
    ],
  }),

  Object.assign({}, shared, {
    targets: [
      { dest: 'dist/react-persist.es6.js', format: 'es' },
      { dest: 'dist/react-persist.js', format: 'cjs' },
    ],
    plugins: [
      resolve(),
      commonjs({
        include: /node_modules/,
      }),
      sourceMaps(),
    ],
  }),
];

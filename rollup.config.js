import pkg from './package.json';

const srcEntry = pkg.source;

function pgl(plugins = []) {
  return plugins;
}

export default [
  {
    input: srcEntry,
    output: [
      { file: pkg.main, format: 'es', exports: 'default' }
    ],
    external: [
      'diagram-js/lib/features/grid-snapping/GridUtil.js',
      'diagram-js/lib/layout/LayoutUtil.js',
      'min-dom',
      'tiny-svg'
    ],
    plugins: pgl()
  }
];

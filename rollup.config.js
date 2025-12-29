import pkg from './package.json';

const srcEntry = pkg.source;

function pgl(plugins = []) {
  return plugins;
}

export default [
  {
    input: srcEntry,
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'es', exports: 'default' }
    ],
    external: [
      'diagram-js/lib/features/grid-snapping/GridUtil',
      'diagram-js/lib/layout/LayoutUtil',
      'min-dom',
      'tiny-svg'
    ],
    plugins: pgl()
  }
];

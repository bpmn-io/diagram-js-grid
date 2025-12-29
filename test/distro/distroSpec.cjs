const { expect } = require('chai');


describe('distro', function() {

  it('should allow consumption via CJS', function() {
    const DiagramJsGrid = require('diagram-js-grid');

    expect(DiagramJsGrid).to.exist;
  });


  it('should allow consumption as ESM', async function() {

    const {
      default: DiagramJsGrid
    } = await import('diagram-js-grid');

    expect(DiagramJsGrid).to.exist;
  });

});

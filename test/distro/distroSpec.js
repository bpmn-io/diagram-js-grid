describe('distro', function() {

  it('should expose CJS bundle', function() {
    const DiagramJsGrid = require('../..');

    expect(DiagramJsGrid).to.exist;
  });


  it('should expose UMD bundle', function() {
    const DiagramJsGrid = require('../../dist/diagram-grid.umd.js');

    expect(DiagramJsGrid).to.exist;
  });

});

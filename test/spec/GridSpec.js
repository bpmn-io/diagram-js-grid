import {
  attr as svgAttr
} from 'min-dom';

import {
  bootstrapDiagram,
  getDiagramJS,
  insertCSS,
  inject
} from '../TestHelper';

import gridModule from '../../lib';

import modelingModule from 'diagram-js/lib/features/modeling';
import gridSnappingModule from 'diagram-js/lib/features/grid-snapping';
import moveModule from 'diagram-js/lib/features/move';
import moveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import zoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';

import { getMid } from 'diagram-js/lib/layout/LayoutUtil';

import { GRID_DIMENSIONS } from '../../lib/Grid';

import { SPACING } from 'diagram-js/lib/features/grid-snapping/GridUtil';

import diagramCSS from 'diagram-js/assets/diagram-js.css';


insertCSS('diagram-js.css', diagramCSS);

var singleStart = window.__env__ && window.__env__.SINGLE_START;


describe('grid', function() {


  describe('modeler', function() {

    (singleStart === 'modeler' ? it.only : it)('should be visible by default', function() {

      // when
      basicSetup({
        modules: [
          modelingModule,
          gridSnappingModule,
          gridModule,
          moveCanvasModule,
          zoomScrollModule,
          moveModule
        ]
      }, this);

      // then
      var grid = getDiagramJS().get('grid'),
          gfx = grid._getParent();

      expect(grid.isVisible()).to.be.true;
      expect(gfx.childNodes).to.have.length(1);
    });


    it('should NOT be visible if gridSnapping is disabled', async function() {

      // when
      basicSetup({
        modules: [
          modelingModule,
          gridSnappingModule,
          gridModule,
          moveModule
        ],
        gridSnapping: {
          active: false
        }
      }, this);

      // then
      var grid = getDiagramJS().get('grid'),
          gfx = grid._getParent();

      expect(grid.isVisible()).to.be.false;
      expect(gfx.childNodes).to.be.empty;
    });


    it('should NOT be visible if gridSnapping is toggled inactive', function() {

      // given
      basicSetup({
        modules: [
          modelingModule,
          gridSnappingModule,
          gridModule,
          moveModule
        ]
      }, this);

      var gridSnapping = getDiagramJS().get('gridSnapping');

      // when
      gridSnapping.setActive(false);

      // then
      var grid = getDiagramJS().get('grid'),
          gfx = grid._getParent();

      expect(grid.isVisible()).to.be.false;
      expect(gfx.childNodes).to.be.empty;
    });


    it('should be visible if gridSnapping is toggled active', function() {

      // given
      basicSetup({
        modules: [
          modelingModule,
          gridSnappingModule,
          gridModule,
          moveModule
        ],
        gridSnapping: {
          active: false
        }
      }, this);

      var gridSnapping = getDiagramJS().get('gridSnapping');

      // when
      gridSnapping.setActive(true);

      // then
      var grid = getDiagramJS().get('grid'),
          gfx = grid._getParent();

      expect(grid.isVisible()).to.be.true;
      expect(gfx.childNodes).to.have.length(1);
    });


    describe('update', function() {

      beforeEach(bootstrapDiagram({
        modules: [
          modelingModule,
          gridSnappingModule,
          gridModule,
          moveModule
        ],
        canvas: {
          deferUpdate: false
        }
      }));


      it('should initially update grid', inject(function(canvas, grid) {

        // then
        var viewbox = canvas.viewbox(),
            viewboxMid = getMid(viewbox);

        var gridMid = getMid({
          x: parseInt(svgAttr(grid._gfx, 'x')),
          y: parseInt(svgAttr(grid._gfx, 'y')),
          width: GRID_DIMENSIONS.width,
          height: GRID_DIMENSIONS.height
        });

        // should be centered around viewbox
        expect(viewboxMid.x).to.be.closeTo(gridMid.x, SPACING / 2);
        expect(viewboxMid.y).to.be.closeTo(gridMid.y, SPACING / 2);
      }));

      [
        { x: 12, y: 24 },
        { x: 24, y: 48 },
        { x: 36, y: 72 },
        { x: 48, y: 96 },
        { x: 60, y: 120 }
      ].forEach(function(delta) {

        it('should update on canvas.viewbox.changed ' + JSON.stringify(delta), inject(
          function(canvas, grid) {

            // when
            canvas.scroll(delta);

            // then
            var viewbox = canvas.viewbox(),
                viewboxMid = getMid(viewbox);

            var gridMid = getMid({
              x: parseInt(svgAttr(grid._gfx, 'x')),
              y: parseInt(svgAttr(grid._gfx, 'y')),
              width: GRID_DIMENSIONS.width,
              height: GRID_DIMENSIONS.height
            });

            // should be centered around viewbox
            expect(viewboxMid.x).to.be.closeTo(gridMid.x, SPACING / 2);
            expect(viewboxMid.y).to.be.closeTo(gridMid.y, SPACING / 2);
          })
        );

      });

    });


    describe('api', function() {

      beforeEach(bootstrapDiagram({
        modules: [
          modelingModule,
          gridSnappingModule,
          gridModule,
          moveModule
        ],
        canvas: {
          deferUpdate: false
        }
      }));


      it('#isVisible', inject(function(grid) {

        // assume
        expect(grid.isVisible()).to.be.true;

        // when
        grid.toggle(false);

        // then
        expect(grid.isVisible()).to.be.false;
      }));


      it('#toggle', inject(function(grid) {

        // when
        grid.toggle(false);

        // then
        var gfx = grid._getParent();

        expect(grid.isVisible()).to.be.false;
        expect(gfx.childNodes).to.be.empty;
      }));

    });


    describe('grid-snapping integration', function() {

      beforeEach(bootstrapDiagram({
        modules: [
          modelingModule,
          gridSnappingModule,
          gridModule,
          moveModule
        ],
        canvas: {
          deferUpdate: false
        }
      }));


      it('should update with gridSnapping', inject(function(grid, gridSnapping) {

        // assume
        expect(grid.isVisible()).to.be.true;

        // given
        gridSnapping.setActive(true);

        // then
        expect(grid.isVisible()).to.be.true;

        // when
        gridSnapping.setActive(false);

        // then
        expect(grid.isVisible()).to.be.false;
      }));

    });

  });


  describe('viewer', function() {

    (singleStart === 'viewer' ? it.only : it)('should show by default', function() {

      // given
      basicSetup({
        modules: [
          gridModule,
          moveCanvasModule,
          zoomScrollModule
        ]
      }, this);

      var grid = getDiagramJS().get('grid'),
          gfx = grid._getParent();

      // assume
      expect(grid.isVisible()).to.be.true;
      expect(gfx.childNodes).to.have.length(1);

      // when
      grid.toggle(false);

      // then
      expect(grid.isVisible()).to.be.false;
      expect(gfx.childNodes).to.be.empty;
    });

  });

});



// helpers ///////////////

function createElements() {
  const canvas = getDiagramJS().get('canvas');

  canvas.addShape({ id: 's1', x: 100, y: 100, width: 50, height: 50 });
  canvas.addShape({ id: 's2', x: 300, y: 200, width: 100, height: 100 });

  canvas.addConnection({ id: 'c1', waypoints: [ { x: 125, y: 125 }, { x: 350, y: 250 } ] });
}


function basicSetup(options, self) {
  bootstrapDiagram(options).call(self);

  createElements();
}
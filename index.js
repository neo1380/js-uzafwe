import './style.css';

import * as joint from 'jointjs';

const svgPanZoom = require('svg-pan-zoom');

var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({
  el: document.getElementById('app'),
  model: graph,
  width: 600,
  height: 500,
  gridSize: 1
});

var targetElt = document.getElementById('app');

const panAndZoom = svgPanZoom(document.getElementById('app').childNodes[2], {
  viewportSelector: document.getElementById('app').childNodes[2].childNodes[1],
  fit: false,
  zoomScaleSensitivity: 0.4,
  panEnabled: false,
  minZoom: 0.01,
  center: false,
  onZoom: function(scale) {
    /*  currentSle = scale;
    setGrid(paper, gridsie * 15 * currentSle, '#808080'); */
  },
  beforePan: function(oldpan, newpan) {
    /*    setGrid(paper, gridsie * 15 * currentSle, '#808080', newpan); */
  },
  beforeZoom: function() {
    /*   realscale = panAndZoom.getSizes().realZoom; */
  }
});

paper.on('blank:pointerdown', function(evt, mouseX, mouseY) {
  panAndZoom.enablePan();
});

//Disable pan when the mouse button is released
paper.on('cell:pointerup', function(cellView, event) {
  panAndZoom.disablePan();
});

var rect = new joint.shapes.standard.Rectangle();
rect.position(100, 30);
rect.resize(100, 40);
rect.attr({
  body: {
    fill: 'blue'
  },
  label: {
    text: 'Hello',
    fill: 'white'
  }
});
rect.addTo(graph);

var rect2 = rect.clone();
rect2.translate(300, 0);
rect2.attr('label/text', 'World!');
rect2.addTo(graph);

var link = new joint.shapes.standard.Link();
link.source(rect);
link.target(rect2);
link.addTo(graph);

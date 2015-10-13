var canvas = $('.literally').literallycanvas();

// Hide Canvas Between Drawing Rounds:
function removeCanvas {
  canvas.teardown();
}
// OR canvas.clear() + css display:none

//Export Canvas at End of Every Drawing Round
function saveCanvasToImage {
  getImage(includeWatermark);
}

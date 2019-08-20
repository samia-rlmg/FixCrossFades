// Script to fix cross dissolves from Premiere projects imported into After Effects

var activeComp = app.project.activeItem;
var layers = activeComp.layers;

for (i=1;i<=activeComp.numLayers;i++) {
  if (activeComp.layer(i).name == "Cross Dissolve") {
    var dissolveLayer = activeComp.layer(i)
    // Get in and out times
    var inPoint = dissolveLayer.inPoint;
    var outPoint = dissolveLayer.outPoint;

    //Look one layer up. If the in points match, fade up the top layer. If not, fade down.
    if (activeComp.layer(i-1).inPoint == inPoint) {
      // Add opacity key frames at the in- and out-points in the layer above
      activeComp.layer(i-1).property("opacity").setValueAtTime(inPoint,0);
      activeComp.layer(i-1).property("opacity").setValueAtTime(outPoint,100);
    } else {
      // Add opacity key frames at the in- and out-points in the layer above
      activeComp.layer(i-1).property("opacity").setValueAtTime(inPoint,100);
      activeComp.layer(i-1).property("opacity").setValueAtTime(outPoint,0);
    }

    // Remove the Cross Dissolve layer.
    dissolveLayer.remove();

  }
}

//const https = require('https');
const Vector = require('../internals/vector');
const VectorArray = require('../internals/vectorArray');
const SVG = require('../internals/svg');

function createSVG(obj) {
    let svg = new SVG(obj.dim);

    obj.pointArray.forEach(function(pointCloud) {
        if (pointCloud.style === SVG.Line) {
            let options = pointCloud.options ? pointCloud.options : obj.styles;
            pointCloud.points.forEach(function(point, index, pointArr) {
                if (pointArr[index + 1]) {
                    svg.addVector(new Vector(point, pointArr[index + 1], options));
                }
            });
        } else if (pointCloud.style === SVG.OptimizedLine) {
            let options = pointCloud.options ? pointCloud.options : obj.styles;
            let vectorArray = new VectorArray(pointCloud.points[0], options);
            pointCloud.points.forEach(function(point, index, pointArr) {
                if (pointArr[index + 1]) {
                    vectorArray.addVector(new Vector(point, pointArr[index + 1]));
                }
            });
            svg.addVector(vectorArray);
        } else if (points.options.style === SVG.Ellipse) {

        }
    });

    return svg.toString();
}

// Send back not implemented status
exports.not_implemented = (req, res) => res.status(501).send({error: req.method + ' not implemented for this endpoint'});

// Retrieve detail about number series
exports.number_series_retrieve = (req, res) => {
    // Set response header content-type since we
    // always send back a JSON in the response
    res.setHeader('content-type', 'image/svg+xml');
    res.status(200).send(createSVG(req.body));
};
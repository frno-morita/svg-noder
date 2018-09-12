'use strict';

const Vector = require('./vector');

const stroke = "stroke";
const stroke_width = "stroke-width";
const fill = "fill";

const defaultOptions = {
    "stroke": "black",
    "stroke-width": 1,
    "fill": "none"
};

/**
 * Class representing a Vector Array.
 */
class VectorArray  {
    /**
     * Create a new `Vector Array`.
     *
     * @param {Array}  startPoint   Start point [x,y]
     * @param {Object} options      Options on how the path vector should be rendered
     */
    constructor (startPoint, options) {
        this.start = startPoint;
        this.options = {};
        this.vectors = [];

        this.options[stroke] = options[stroke] ? options[stroke] : defaultOptions[stroke];
        this.options[stroke_width] = options[stroke_width] ? options[stroke_width] : defaultOptions[stroke_width];
        this.options[fill] = options[fill] ? options[fill] : defaultOptions[fill];
    }

    addVector(vector) {
        this.vectors.push(vector);
    }

    toString() {
        return Vector.VectorTag.replace('%4', this.options[fill])
            .replace('%3', this.options[stroke_width])
            .replace('%2', this.options[stroke])
            .replace('%1', 'M' + this.start.join(' ') + this.vectors.reduce(function(accumulator, vector) {
                return accumulator + vector.toMinimalLineString();
            }, ''));
    }
}

module.exports = VectorArray;
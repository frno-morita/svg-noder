'use strict';

const stroke = "stroke";
const stroke_width = "stroke-width";
const fill = "fill";

const posTheta = 90 * (Math.PI / 180);
const negTheta = 90 * (Math.PI / 180);

const vectorTag = '<path d="%1" stroke="%2" stroke-width="%3" fill="%4" />';
const defaultOptions = {
    "stroke": "black",
    "stroke-width": 1,
    "fill": "none"
};

/**
 * Class representing a Vector Array.
 */
class Vector {
    /**
     * Create a new `Vector`.
     *
     * @param {Array}  startPoint   Start point [x,y]
     * @param {Array}  endPoint     End point [x,y]
     * @param {Object} options      Options on how the path vector should be rendered
     */
    constructor (startPoint, endPoint, options = {}) {
        this.start = startPoint;
        this.end = endPoint;
        this.options = {};

        this.middle = [(this.start[0] + this.end[0])/2, (this.start[1] + this.end[1])/2];
        this.normalizedMiddle = Vector.normalize(this.middle, this.start);

        this.options[stroke] = options[stroke] ? options[stroke] : defaultOptions[stroke];
        this.options[stroke_width] = options[stroke_width] ? options[stroke_width] : defaultOptions[stroke_width];
        this.options[fill] = options[fill] ? options[fill] : defaultOptions[fill];
    }

    static normalize(origin, point) {
        return [point[0] - origin[0], point[1] - origin[1]];
    }

    static restore(origin, point) {
        return [point[0] + origin[0], point[1] + origin[1]];
    }

    test() {
        let start = this.start.slice(0);
        let end = this.end.slice(0);

        let normalizedStart = Vector.normalize(start);
        let normalizedEnd = Vector.normalize(end);

        console.log('Normalized: ', [normalizedStart, normalizedEnd]);
        console.log('Restored: ', [Vector.restore(normalizedStart), Vector.restore(normalizedEnd)]);
    }

    rotate90deg() {
        return Vector.restore([
            this.normalizedMiddle[0] * Math.cos(posTheta) - this.normalizedMiddle[1] * Math.sin(posTheta),
            this.normalizedMiddle[0] * Math.sin(posTheta) + this.normalizedMiddle[1] * Math.cos(posTheta)
        ], this.middle);
    }

    middlePoint() {
        return [(this.end[0] + this.start[0])/2, (this.end[1] + this.start[1])/2];
    }

    toMinimalLineString() {
        return ' L' + this.start.join(' ') + ' L' + this.end.join(' ');
    }

    toString() {
        return vectorTag.replace('%4', this.options[fill])
            .replace('%3', this.options[stroke_width])
            .replace('%2', this.options[stroke])
            .replace('%1', 'M' + this.start.join(' ') + ' L' + this.end.join(' '));
    }
}

module.exports = Vector;
module.exports.VectorTag = vectorTag;

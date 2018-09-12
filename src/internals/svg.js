'use strict';

const defaultDimensions = [300, 300]
const xmlTag = '<?xml version="1.0" encoding="utf-8" ?>';
const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="%1" height="%2">%3</svg>';

class SVG {

    constructor (options = {}) {
        if (options.dim) {
            this.options = options.dim;
        } else {
            this.options = defaultDimensions;
        }

        this.vectors = [];
    }

    addVector(vector) {
        this.vectors.push(vector);
    }

    parseSvgOptions(tag) {
        return tag.replace('%1', this.options[0]).replace('%2', this.options[1]);
    }

    parseSvgContent(tag) {
        return tag.replace('%3', this.vectors.reduce(function(accumulator, vector) {
            return accumulator + vector.toString();
        }, ''));
    }

    toString() {
        return xmlTag + this.parseSvgContent(this.parseSvgOptions(svgTag));
    }
}

module.exports = SVG;
module.exports.Line = 'line';
module.exports.Ellipse = 'ellipse';
module.exports.OptimizedLine = 'optimized-line';
module.exports.XMLTag = xmlTag;

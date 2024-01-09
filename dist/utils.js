"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floorToClosest = exports.roundToClosest = void 0;
function roundToClosest(value, rootNumber) {
    return Math.round(value / rootNumber) * rootNumber;
}
exports.roundToClosest = roundToClosest;
function floorToClosest(value, rootNumber) {
    return Math.floor(value / rootNumber) * rootNumber;
}
exports.floorToClosest = floorToClosest;

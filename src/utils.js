export function roundToClosest(value, rootNumber){
    return Math.round(value / rootNumber) * rootNumber;
}
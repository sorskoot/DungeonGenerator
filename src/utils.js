export function roundToClosest(value, rootNumber){
    return Math.round(value / rootNumber) * rootNumber;
}

export function floorToClosest(value, rootNumber){
    return Math.floor(value / rootNumber) * rootNumber;
}
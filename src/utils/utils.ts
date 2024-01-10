export function roundToClosest(value: number, rootNumber: number): number {
  return Math.round(value / rootNumber) * rootNumber;
}

export function floorToClosest(value: number, rootNumber: number): number {
  return Math.floor(value / rootNumber) * rootNumber;
}

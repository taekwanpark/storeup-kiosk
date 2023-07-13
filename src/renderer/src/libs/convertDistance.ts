export function convertDistance(distance: number): string {
  let convertedDistance: number | string = distance
  if (distance > 1000) {
    convertedDistance = (distance / 1000).toFixed(1) + 'km'
  } else {
    convertedDistance = Math.floor(convertedDistance).toString() + 'm'
  }
  return convertedDistance
}

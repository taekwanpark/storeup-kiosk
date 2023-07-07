export interface DistanceArgsType {
  fromLat: number
  fromLon: number
  toLat: number
  toLon: number
}

export function getDistance(args: DistanceArgsType): string {
  const R = 6371000 // 지구 반지름 (단위: m)
  const dLat = deg2rad(args.toLat - args.fromLat)
  const dLon = deg2rad(args.toLon - args.fromLon)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(args.fromLat)) *
      Math.cos(deg2rad(args.toLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let distance: number | string = R * c
  if (distance > 1000) {
    // 1,000m 이상일 경우 소수점 두번째 자리까지(km)
    distance = (distance / 1000).toFixed(2)
  } else {
    // 1,000m 이하일 경우 소수점 버리기(m)
    Math.floor(distance)
  }
  return distance.toString()
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

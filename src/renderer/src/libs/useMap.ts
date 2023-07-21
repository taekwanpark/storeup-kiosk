interface UseMapType {
  loadKakao: () => void
  moveToDefault: () => void
  zoomIn: () => void
  zoomOut: () => void
}

export function useMap(): UseMapType {
  /*
|----------------------------------------------------------------------------------------------------
| kakao map Script Load
|----------------------------------------------------------------------------------------------------
*/
  let map
  let defaultPosition
  function loadKakao(): void {
    if (!window.kakao || !window.kakao.maps) {
      const kakaoMap = document.createElement('script')
      kakaoMap.setAttribute(
        'src',
        'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f55b67d7a842ed5762627813914ffae4'
      )
      document.head.appendChild(kakaoMap)

      kakaoMap.addEventListener('load', () => {
        console.log('### KAKAO ### - Loaded')
        kakao.maps.load(mapInit)
      })
    } else {
      console.log('### KAKAO ### - Already Loaded')
      mapInit()
    }
  }

  /*
|----------------------------------------------------------------------------------------------------
| kakao map init
|----------------------------------------------------------------------------------------------------
*/
  function mapInit(): void {
    const container: HTMLElement | null = document.getElementById('kakao-map')

    if (container !== null) {
      defaultPosition = new kakao.maps.LatLng(35.147707, 129.058673)

      const options = {
        center: defaultPosition,
        level: 1
      }

      map = new kakao.maps.Map(container, options)
      console.log(map)
      new kakao.maps.Marker({
        title: '현재 위치',
        map: map,
        position: defaultPosition
      })
    }
  }

  /*
|----------------------------------------------------------------------------------------------------
| kakao map move to default
|----------------------------------------------------------------------------------------------------
*/
  function moveToDefault(): void {
    map.panTo(defaultPosition)
  }

  /*
|----------------------------------------------------------------------------------------------------
| kakao map Zoom In
|----------------------------------------------------------------------------------------------------
*/
  function zoomIn(): void {
    // 현재 지도의 레벨을 얻어옵니다
    const level = map.getLevel()

    // 지도를 1레벨 내립니다 (지도가 확대됩니다)
    map.setLevel(level - 1, { animate: true })
  }

  /*
|----------------------------------------------------------------------------------------------------
| kakao map Zoom Out
|----------------------------------------------------------------------------------------------------
*/
  function zoomOut(): void {
    // 현재 지도의 레벨을 얻어옵니다
    const level = map.getLevel()

    // 지도를 1레벨 올립니다 (지도가 축소됩니다)
    map.setLevel(level + 1, { animate: true })
  }

  return {
    loadKakao,
    moveToDefault,
    zoomIn,
    zoomOut
  }
}

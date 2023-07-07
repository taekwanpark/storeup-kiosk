/*
|---------------------------------------------------------------------------------
| heightAdjustHandle
|---------------------------------------------------------------------------------
| XD - lineheight 와 CSS - lineheight가 다르므로 높이 조정해야함
*/
interface HeightAdjustParams {
  selector: string
  fontSize: number
  lineHeight: number
  height: number
}
export function heightAdjustHandler({
  selector,
  lineHeight,
  height,
  fontSize
}: HeightAdjustParams): void {
  const divideGap = (fontSize - lineHeight + (height - fontSize)) / 2
  const margin = `${divideGap}rem`
  const elements = document.getElementsByClassName(selector)
  for (const element of elements) {
    const htmlElement = element as HTMLElement
    htmlElement.style.marginTop = margin
    htmlElement.style.marginBottom = margin
  }
}

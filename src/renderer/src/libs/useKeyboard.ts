import { Ref, ref } from 'vue'
// vue
import VirtualKeyboard from '@renderer/components/virtual-keyboard/VirtualKeyboard.vue'

export type KeyboardRefType = InstanceType<typeof VirtualKeyboard> | undefined

interface KeyboardReturn {
  focusInput: (value: boolean) => void
  updateInput: (value: string) => void
  clearInput: (ref: KeyboardRefType) => void
  inputValue: Ref<string>
  isFocused: Ref<boolean>
}

export function useKeyboard(): KeyboardReturn {
  const isFocused: Ref<boolean> = ref(false)
  const inputValue: Ref<string> = ref('')

  /*
  |------------------------------------------------------------------------------------------
  | Detect Input Focused
  |------------------------------------------------------------------------------------------
  */
  const focusInput: KeyboardReturn['focusInput'] = (value) => {
    console.log('### useKeyboard ### - focusInput', value)

    isFocused.value = value
    blinkCursor(value)
    // 종료되는 method 필요
  }

  /*
  |------------------------------------------------------------------------------------------
  | Update Input
  |------------------------------------------------------------------------------------------
  */
  const updateInput: KeyboardReturn['updateInput'] = (value) => {
    console.log('### useKeyboard ### - updateInput', value)

    inputValue.value = value
  }

  /*
  |------------------------------------------------------------------------------------------
  | Clear Input
  |------------------------------------------------------------------------------------------
  */
  const clearInput: KeyboardReturn['clearInput'] = (ref) => {
    if (ref !== null && ref !== undefined) {
      console.log('### useKeyboard ### - clearInput')

      inputValue.value = ''
      // exposed function from Virtual Keyboard
      ref.clearVirtualInput()
    }
  }

  return {
    focusInput,
    updateInput,
    clearInput,
    inputValue,
    isFocused
  }
}

/*
|------------------------------------------------------------------------------------------
| Cursor Animation
|------------------------------------------------------------------------------------------
|
| value = input focused or not
|
*/
function blinkCursor(value: boolean): void {
  console.log('blink')

  // 스타일 규칙을 생성하여 스타일시트에 추가
  const keyframes = `
   @keyframes cursorBlink {
     0% { opacity: 1; }
     50% { opacity: 0; }
     100% { opacity: 1; }
   }
   `
  const ruleAfter = `.cursor-blink:after { margin-left: 2px; border-right: 1.5px solid #a7a7a8; content: ""; animation: cursorBlink 1s infinite; }`

  const styleSheet: CSSStyleSheet = document.styleSheets[0] // 스타일시트 객체 선택
  const ruleList: CSSRuleList = styleSheet.cssRules // 첫 번째 스타일시트의 CSSRuleList 가져오기

  let keyframesRuleIndex: number | undefined
  let cssRuleIndex: number | undefined
  for (let i = 0; i < ruleList.length; i++) {
    const rule = ruleList[i]
    if (rule instanceof CSSKeyframesRule && rule.name === 'cursorBlink') {
      keyframesRuleIndex = i
    }
    if (rule instanceof CSSStyleRule && rule.selectorText === '.cursor-blink::after') {
      cssRuleIndex = i
    }
  }

  if (value && typeof keyframesRuleIndex !== 'undefined') {
    // true + 애니메이션 실행 중
    return
  } else if (value && typeof keyframesRuleIndex === 'undefined') {
    // true + 애니메이션 중지 중
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length)
    styleSheet.insertRule(ruleAfter, styleSheet.cssRules.length)
  } else if (
    !value &&
    typeof keyframesRuleIndex !== 'undefined' &&
    typeof cssRuleIndex !== 'undefined'
  ) {
    // false + 애니메이션 실행 중
    styleSheet.deleteRule(keyframesRuleIndex)
    styleSheet.deleteRule(cssRuleIndex - 1)
  } else if (!value && typeof keyframesRuleIndex === 'undefined') {
    // false + 애니메이션 중지 중
    return
  }
}

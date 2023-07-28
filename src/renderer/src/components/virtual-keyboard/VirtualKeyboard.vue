<template>
  <div id="virtual-keyboard" class="fixed bottom-[12.75rem] inset-x-0">
    <div class="simple-keyboard"></div>
  </div>
</template>

<script setup lang="ts">
// TODO search
// TODO Max length
// TODO Cursor
import { onMounted, ref, Ref } from 'vue'
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'
import * as Hangul from 'hangul-js'

interface KeyboardProps {
  inputContainer: string
}

const props = defineProps<KeyboardProps>()

const emits = defineEmits<{
  (e: 'update:input', value: string): void
  (e: 'focus:input', value: boolean): void
}>()

/*
|------------------------------------------------------------------------------------------
| Keyboard
|------------------------------------------------------------------------------------------
*/
// keyboardRef 변수를 ref()로 감싸주고 타입을 지정합니다.
const keyboardElement: Ref<Keyboard | null> = ref(null)

const display = {
  '{alt}': '123',
  '{shift}': '⇧',
  '{shiftactivated}': '⬆︎',
  '{bksp}': '⌫',
  '{lang}': '🌐',

  '{default}': '가나다',
  '{english}': 'ABC',

  '{search}': '검색',
  '{space}': '스페이스'
}

const displayEn = {
  ...display,
  '{search}': 'Search',
  '{space}': 'space'
}

const layout = {
  // default: [
  //   '\u1107 \u110c \u1103 \u1100 \u1109 \u116d \u1167 \u1163 \u1162 \u1166',
  //   '\u1106 \u1102 \u110b \u1105 \u1112 \u1169 \u1165 \u1161 \u1175',
  //   '{shift} \u110f \u1110 \u110e \u1111 \u1172 \u116e \u1173 {bksp}',
  //   '{alt} {lang} {space} {search}'
  // ],
  // shift: [
  //   '\u1108 \u110d \u1104 \u1101 \u110a \u116d \u1167 \u1163 \u1164 \u1168',
  //   '\u1106 \u1102 \u110b \u1105 \u1112 \u1169 \u1165 \u1161 \u1175',
  //   '{shiftactivated} \u110f \u1110 \u110e \u1111 \u1172 \u116e \u1173 {bksp}',
  //   '{alt} {lang} {space} {search}'
  // ],
  default: [
    'ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ',
    'ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ',
    '{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {bksp}',
    '{alt} {lang} {space} {search}'
  ],
  shift: [
    'ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ',
    'ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ',
    '{shiftactivated} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {bksp}',
    '{alt} {lang} {space} {search}'
  ],
  alt: [
    '1 2 3 4 5 6 7 8 9 0',
    `@ # $ & * ( ) ' "`,
    '? % - + = / ; : ! ? {bksp}',
    '{default} {lang} {space} {search}'
  ],
  english: [
    'q w e r t y u i o p',
    'a s d f g h j k l',
    '{shift} z x c v b n m {bksp}',
    '{alt} {lang} {space} {search}'
  ],
  shiftEnglish: [
    'Q W E R T Y U I O P',
    'A S D F G H J K L',
    '{shiftactivated} Z X C V B N M {bksp}',
    '{alt} {lang} {space} {search}'
  ],
  altEnglish: [
    '1 2 3 4 5 6 7 8 9 0',
    `@ # $ & * ( ) ' "`,
    '? % - + = / ; : ! ? {bksp}',
    '{english} {lang} {space} {search}'
  ]
}

const buttonTheme = [
  {
    class: 'space-width-full',
    buttons: '{space}'
  },
  {
    class: 'button-square',
    buttons: '{alt}'
  },
  {
    class: 'my-button-function-color',
    buttons: '{shift} {alt} {default} {english} {bksp} {lang}'
  },
  {
    class: 'my-button-activated-color',
    buttons: '{shiftactivated}'
  },
  {
    class: 'my-button-search-shape',
    buttons: '{search}'
  },
  {
    class: 'my-button-alt-shape',
    buttons: '{alt} {default} {english}'
  },
  {
    class: 'my-button-lang-shape',
    buttons: '{lang}'
  },
  {
    class: 'my-button-shift-bksp-shape',
    buttons: '{shift} {shiftactivated} {bksp}'
  }
]

/*
|------------------------------------------------------------------------------------------
| Input
|------------------------------------------------------------------------------------------
*/
function updateVirtualInput(value: string): void {
  if (currentLang.value === 'ko') {
    const char = value.split('')
    const koreanWords = Hangul.a(char)
    console.log('Input changed', koreanWords)
    emits('update:input', koreanWords)
  } else {
    console.log('Input changed', value)
    emits('update:input', value)
  }
}

/*
|------------------------------------------------------------------------------------------
| Check whether specific key
|------------------------------------------------------------------------------------------
*/
function pressVirtualKey(button: string): void {
  console.log('Button pressed', button)
  if (button.includes('{') && button.includes('}') && button !== '{space}') {
    handleShift(button)
  }
}
/*
|------------------------------------------------------------------------------------------
| Clear Input
|------------------------------------------------------------------------------------------
*/
function clearVirtualInput(): void {
  console.log('Clear input')
  if (keyboardElement.value !== null && keyboardElement.value !== undefined)
    keyboardElement.value.clearInput()
}
defineExpose({ clearVirtualInput })
/*
|------------------------------------------------------------------------------------------
| Handle Shift Key
|------------------------------------------------------------------------------------------
*/
const currentLang: Ref<string> = ref('ko')
function handleShift(button: string): void {
  if (keyboardElement.value !== null) {
    const currentLayout = keyboardElement.value.options.layoutName
    let layoutName: string | undefined

    switch (button) {
      case '{lang}':
        if (currentLang.value === 'ko') {
          layoutName = 'english'
          currentLang.value = 'en'
          keyboardElement.value.setOptions({
            display: displayEn
          })
        } else {
          layoutName = 'default'
          currentLang.value = 'ko'
          keyboardElement.value.setOptions({
            display: display
          })
        }
        break

      case '{shift}':
      case '{shiftactivated}':
        if (currentLang.value === 'ko') {
          layoutName = currentLayout === 'default' ? 'shift' : 'default'
        } else {
          layoutName = currentLayout === 'english' ? 'shiftEnglish' : 'english'
        }
        break

      case '{alt}':
        if (currentLang.value === 'ko') {
          layoutName = currentLayout === 'alt' ? 'default' : 'alt'
        } else {
          layoutName = currentLayout === 'altEnglish' ? 'english' : 'altEnglish'
        }
        break

      case '{default}':
        layoutName = currentLayout === 'default' ? 'shift' : 'default'
        break
      case '{english}':
        layoutName = currentLayout === 'english' ? 'shiftEnglish' : 'english'
        break

      default:
        break
    }

    if (typeof layoutName !== 'undefined') {
      keyboardElement.value.setOptions({
        layoutName: layoutName
      })
    }
  }
}

/*
|------------------------------------------------------------------------------------------
| Button Init
|------------------------------------------------------------------------------------------
*/
onMounted(() => {
  keyboardElement.value = new Keyboard('.simple-keyboard', {
    onChange: (input: string): void => updateVirtualInput(input),
    onKeyPress: (button: string): void => pressVirtualKey(button),
    theme: 'hg-theme-default hg-layout-default myTheme',
    layout: layout,
    buttonTheme: buttonTheme,
    display: display,
    autoUseTouchEvents: true
  })
})

/*
|----------------------------------------------------------------------------------------------------
| dismiss virtual keyboard
|----------------------------------------------------------------------------------------------------
*/
onMounted(() => {
  document.addEventListener('click', function (e: Event) {
    // input conatiner
    const inputContainer = document.getElementById(props.inputContainer)
    // keyboard
    const virtualKeyboard = document.getElementById('virtual-keyboard')

    // click event 발생했을 때, inputContainer가 존재하고, keyboard가 존재할 경우
    if (e.target !== null && inputContainer !== null && virtualKeyboard !== null) {
      const childNode = e.target as Node
      const isChildElement: boolean = inputContainer.contains(childNode)
      const isKeyboard: boolean = virtualKeyboard.contains(childNode)
      // click event target이 inputContainer에 속하지 않고, keyboard에도 속하지 않을 경우 dismiss
      if (!isChildElement && !isKeyboard) {
        emits('focus:input', false)
        keyboardElement.value && keyboardElement.value.destroy()
      }
    }
  })
})
</script>

<style>
.simple-keyboard {
  width: 100%;
  height: 22.75rem;
}

.simple-keyboard.hg-theme-default.myTheme {
  background-color: #e1e1e3;
  width: 100%;
  padding: 0.688rem;
}

.hg-row {
  margin-inline: auto;
  gap: 0.25rem;
}
.hg-theme-default .hg-row:not(:last-child) {
  margin-bottom: 0.25rem;
}
.hg-row .hg-button {
  height: 5.125rem;
  font-size: 1.625rem;
  letter-spacing: -0.39px;
  padding: 0px;
}
.hg-theme-default .hg-row .hg-button:not(:last-child) {
  margin-right: 0px;
}

/* special */
.hg-functionBtn.my-button-function-color {
  background-color: #ebebeb;
}
.hg-functionBtn.my-button-activated-color {
  background-color: #282b33;
  color: #fff;
}

.hg-functionBtn.my-button-search-shape {
  background-color: #4e5564;
  color: #fff;
  width: 13.75rem;
  flex-shrink: 0;
  flex-grow: 0;
}
.hg-theme-default .hg-button.my-button-search-shape.hg-activeButton {
  background-color: #282b33;
}
.hg-functionBtn.my-button-alt-shape {
  width: 6.375rem;
  flex-shrink: 0;
  flex-grow: 0;
}
.hg-functionBtn.my-button-lang-shape {
  width: 7.375rem;
  flex-shrink: 0;
  flex-grow: 0;
}
.hg-functionBtn.my-button-shift-bksp-shape {
  width: 10.562rem;
  flex-shrink: 0;
  flex-grow: 0;
}
.space-width-full {
  width: auto;
}
</style>

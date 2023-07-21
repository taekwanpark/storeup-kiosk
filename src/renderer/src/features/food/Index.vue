<template>
  <div class="fixed bottom-[13.5rem] inset-x-0">
    <input
      id="virtual-keyboad-input"
      v-model="inputValue"
      class="input"
      placeholder="Tap on the virtual keyboard to start"
    />
    <div class="simple-keyboard"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue'
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

// input 변수를 ref()로 감싸주고 타입을 지정합니다.
const inputValue: Ref<string> = ref('')

/*
|------------------------------------------------------------------------------------------
| Input
|------------------------------------------------------------------------------------------
*/
function onInputChange(value: string): void {
  // input.value 대신 v-model을 사용하여 양방향 바인딩합니다.
  inputValue.value = value
  // keyboardRef.value?.setInput(value)
  console.log('Input changed', value)
}

/*
|------------------------------------------------------------------------------------------
| Check whether specific key
|------------------------------------------------------------------------------------------
*/
function onKeyPress(button: string): void {
  console.log('Button pressed', button)
  // if (button === '{shift}' || button === '{lock}') handleShift()
  if (button.includes('{') && button.includes('}')) {
    handleShift(button)
  }
}

/*
|------------------------------------------------------------------------------------------
| Handle Shift Key
|------------------------------------------------------------------------------------------
*/
function handleShift(button: string): void {
  if (keyboardRef.value !== null) {
    // const currentLayout = keyboardRef.value.options.layoutName
    // const shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
    // keyboardRef.value.setOptions({
    //   layoutName: shiftToggle
    // })
    // iOS
    const currentLayout = keyboardRef.value.options.layoutName
    let layoutName

    switch (button) {
      case '{shift}':
      case '{shiftactivated}':
      case '{default}':
        layoutName = currentLayout === 'default' ? 'shift' : 'default'
        break

      case '{alt}':
      case '{altright}':
        layoutName = currentLayout === 'alt' ? 'default' : 'alt'
        break

      case '{smileys}':
        layoutName = currentLayout === 'smileys' ? 'default' : 'smileys'
        break

      default:
        break
    }

    if (layoutName) {
      keyboardRef.value.setOptions({
        layoutName: layoutName
      })
    }
  }
}

// keyboardRef 변수를 ref()로 감싸주고 타입을 지정합니다.
const keyboardRef: Ref<Keyboard | null> = ref(null)
const layout = {
  default: [
    'q w e r t y u i o p',
    'a s d f g h j k l',
    '{shift} z x c v b n m , . {bksp}',
    '{alt} {smileys} {space} {enter}'
  ],
  shift: [
    'Q W E R T Y U I O P',
    'A S D F G H J K L',
    '{shiftactivated} Z X C V B N M , . {shiftactivated}',
    '{alt} {smileys} {space} {enter}'
  ],
  alt: [
    '1 2 3 4 5 6 7 8 9 0',
    `@ # $ & * ( ) ' " `,
    '{shift} % - + = / ; : ! ? {bksp}',
    '{default} {smileys} {space} {enter}'
  ],
  smileys: [
    '😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎',
    `😏 😬 😭 😓 😱 😪 😬 😴 😯 `,
    '😐 😇 🤣 😘 😚 😆 😡 😥 😓 🙄 {bksp}',
    '{default} {smileys} {space} {enter}'
  ]
}
const display = {
  '{alt}': '123',
  '{smileys}': '\uD83D\uDE03',
  '{shift}': '⇧',
  '{shiftactivated}': '⇧',
  '{enter}': 'return',
  '{bksp}': '⌫',
  '{space}': ' ',
  '{default}': 'ABC'
}
const buttonTheme = [
  {
    class: 'space-width-full',
    buttons: '{space}'
  },
  {
    class: 'button-square',
    buttons: '{alt} {smileys}'
  }
]
/*
|------------------------------------------------------------------------------------------
| Button Init
|------------------------------------------------------------------------------------------
*/
onMounted(() => {
  keyboardRef.value = new Keyboard('.simple-keyboard', {
    onChange: (input: string): void => onInputChange(input),
    onKeyPress: (button: string): void => onKeyPress(button),
    theme: 'hg-theme-default hg-layout-default myTheme',
    layout: layout,
    buttonTheme: buttonTheme,
    display: display,
    autoUseTouchEvents: true
    // preventMouseDownDefault: false,
  })
})
</script>

<style>
input#virtual-keyboad-input {
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
}

.simple-keyboard {
  width: 100%;
}

.simple-keyboard.hg-theme-default.myTheme {
  border-radius: 10px;
  width: calc(100% - 20px);
  margin-inline: auto;
}
.hg-row {
  margin-inline: auto;
}
.hg-row .hg-button {
  height: 5rem;
  flex-basis: 5rem;
}
.hg-button-space.space-width-full {
  width: 50%;
}
.hg-functionBtn.button-square {
  flex-basis: 100px;
  flex-grow: 0;
}
</style>
